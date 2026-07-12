import fs from "node:fs";
import path from "node:path";

import type { Page, TestInfo } from "@playwright/test";

export const AUDIT_CURRENT_DIR = path.join("ui-audit", "current");
export const AUDIT_REPORTS_DIR = path.join("ui-audit", "reports");

/** Next.js / tooling URLs that commonly fail or noise the network log in development. */
const EXPECTED_REQUEST_NOISE = [
  /\/_next\/webpack-hmr(?:\?|$)/i,
  /\/_next\/static\/webpack\//i,
  /\.hot-update\./i,
  /\/__nextjs_original-stack-frame/i,
  /\/__nextjs_launch-editor/i,
  /\/_next\/webpack/i,
  /chrome-extension:\/\//i,
  /about:blank/i,
];

/** Console messages that are expected in local Next.js / React development. */
const EXPECTED_CONSOLE_NOISE = [
  /download the react devtools/i,
  /fast refresh/i,
  /\[hmr\]/i,
  /\[webpack\]/i,
  /hydration/i,
  /did not match/i,
  /extra attributes from the server/i,
  /controlled input/i,
];

export function isExpectedRequestNoise(url: string): boolean {
  return EXPECTED_REQUEST_NOISE.some((pattern) => pattern.test(url));
}

export function isExpectedConsoleNoise(message: string): boolean {
  return EXPECTED_CONSOLE_NOISE.some((pattern) => pattern.test(message));
}

export type PageProbe = {
  consoleErrors: string[];
  failedRequests: string[];
};

export function attachPageProbes(page: Page): PageProbe {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", (message) => {
    if (message.type() !== "error") {
      return;
    }
    const text = message.text();
    if (isExpectedConsoleNoise(text)) {
      return;
    }
    consoleErrors.push(text);
  });

  page.on("pageerror", (error) => {
    if (isExpectedConsoleNoise(error.message)) {
      return;
    }
    consoleErrors.push(error.message);
  });

  page.on("requestfailed", (request) => {
    const url = request.url();
    if (isExpectedRequestNoise(url)) {
      return;
    }

    const failure = request.failure()?.errorText ?? "unknown error";
    failedRequests.push(`${failure} — ${url}`);
  });

  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();

    if (status < 400 || isExpectedRequestNoise(url)) {
      return;
    }

    // Document and navigation responses only — ignore opaque/cors noise.
    const resourceType = response.request().resourceType();
    if (
      resourceType === "document" ||
      resourceType === "stylesheet" ||
      resourceType === "script" ||
      resourceType === "image" ||
      resourceType === "font" ||
      resourceType === "xhr" ||
      resourceType === "fetch"
    ) {
      failedRequests.push(`HTTP ${status} — ${url}`);
    }
  });

  return { consoleErrors, failedRequests };
}

export async function getHorizontalOverflowDetails(page: Page): Promise<{
  hasOverflow: boolean;
  clientWidth: number;
  scrollWidth: number;
  overflowingSelectors: string[];
}> {
  return page.evaluate(() => {
    const root = document.documentElement;
    const clientWidth = window.innerWidth;
    const scrollWidth = Math.max(
      root.scrollWidth,
      document.body?.scrollWidth ?? 0,
    );

    // Prefer a user-visible check: can the document itself be scrolled horizontally?
    const scrollingElement = document.scrollingElement ?? root;
    const previousScrollX = window.scrollX;
    window.scrollTo(Math.max(scrollingElement.scrollWidth, 10_000), window.scrollY);
    const scrolledX = window.scrollX;
    window.scrollTo(previousScrollX, window.scrollY);
    const hasOverflow = scrolledX > 1 || scrollWidth > clientWidth + 1;

    const overflowingSelectors: string[] = [];

    if (hasOverflow) {
      const all = Array.from(document.querySelectorAll("body *"));
      for (const element of all) {
        const style = window.getComputedStyle(element);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.position === "fixed"
        ) {
          continue;
        }

        // Nested horizontal scrollers are intentional (e.g. comparison table).
        let nestedScroller = false;
        let ancestor: Element | null = element.parentElement;
        while (ancestor && ancestor !== document.body) {
          const ancestorStyle = window.getComputedStyle(ancestor);
          if (
            /(auto|scroll)/.test(ancestorStyle.overflowX) ||
            /(auto|scroll)/.test(ancestorStyle.overflow)
          ) {
            nestedScroller = true;
            break;
          }
          ancestor = ancestor.parentElement;
        }
        if (nestedScroller) {
          continue;
        }

        const rect = element.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) {
          continue;
        }

        if (rect.right > clientWidth + 1 || rect.left < -1) {
          const segments: string[] = [];
          let node: Element | null = element;
          while (node && node !== document.body && segments.length < 5) {
            const tag = node.tagName.toLowerCase();
            const id = node.id ? `#${node.id}` : "";
            const className =
              typeof node.className === "string" && node.className.trim()
                ? `.${node.className.trim().split(/\s+/).slice(0, 2).join(".")}`
                : "";
            segments.unshift(`${tag}${id}${className}`);
            node = node.parentElement;
          }
          overflowingSelectors.push(
            `${segments.join(" > ")} [right=${Math.round(rect.right)}px]`,
          );
          if (overflowingSelectors.length >= 10) {
            break;
          }
        }
      }
    }

    return { hasOverflow, clientWidth, scrollWidth, overflowingSelectors };
  });
}

export async function getBrokenImages(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    return Array.from(document.images)
      .filter((image) => {
        // Ignore images that have not finished loading (e.g. lazy below-fold).
        // A broken image is complete with zero intrinsic dimensions.
        if (!image.src || !image.complete) {
          return false;
        }
        return image.naturalWidth === 0 || image.naturalHeight === 0;
      })
      .map((image) => image.currentSrc || image.src);
  });
}

export function ensureAuditDirectories(): void {
  fs.mkdirSync(AUDIT_CURRENT_DIR, { recursive: true });
  fs.mkdirSync(AUDIT_REPORTS_DIR, { recursive: true });
}

export function writeReport(
  filename: string,
  contents: string,
): string {
  ensureAuditDirectories();
  const filePath = path.join(AUDIT_REPORTS_DIR, filename);
  fs.writeFileSync(filePath, contents, "utf8");
  return filePath;
}

export function formatList(items: string[], emptyLabel = "None"): string {
  if (items.length === 0) {
    return emptyLabel;
  }

  return items.map((item) => `- ${item}`).join("\n");
}

export function viewportLabel(testInfo: TestInfo): string {
  return testInfo.project.name;
}

/**
 * Prepare the page for a stable full-page visual capture.
 *
 * Scrolls through the document so scroll-triggered Motion `whileInView`
 * reveals activate, then returns to the top. Does not globally force opacity
 * on all elements (menus, dialogs, and accordion panels stay as-is).
 *
 * Call only before screenshot capture — not before accessibility scans.
 */
export async function preparePageForVisualCapture(page: Page): Promise<void> {
  // Best-effort network idle. Next.js HMR websockets can prevent a true idle
  // state, so we cap the wait and continue.
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {
    /* continue — fonts/images/scroll still settle the capture */
  });

  await page.evaluate(async () => {
    await document.fonts.ready;

    const images = Array.from(document.images);
    await Promise.all(
      images.map(async (image) => {
        if (!image.src) {
          return;
        }

        if (!image.complete) {
          await Promise.race([
            new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            }),
            new Promise<void>((resolve) => {
              setTimeout(resolve, 3_000);
            }),
          ]);
        }

        if (typeof image.decode === "function" && image.naturalWidth > 0) {
          try {
            await image.decode();
          } catch {
            /* decode can reject for broken images — ignore */
          }
        }
      }),
    );
  });

  const viewportHeight = page.viewportSize()?.height ?? 800;
  const step = Math.max(Math.floor(viewportHeight * 0.7), 1);
  const pauseMs = 200;

  let scrollY = 0;
  for (;;) {
    const maxScrollY = await page.evaluate(() => {
      const scrollingElement =
        document.scrollingElement ?? document.documentElement;
      return Math.max(scrollingElement.scrollHeight - window.innerHeight, 0);
    });

    if (scrollY >= maxScrollY) {
      break;
    }

    scrollY = Math.min(scrollY + step, maxScrollY);
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, scrollY);
    await page.waitForTimeout(pauseMs);
  }

  // Ensure the absolute bottom is reached even if height grew during scroll.
  await page.evaluate(() => {
    const scrollingElement =
      document.scrollingElement ?? document.documentElement;
    window.scrollTo(0, scrollingElement.scrollHeight);
  });
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
}
