import path from "node:path";

import { expect, test } from "@playwright/test";

import {
  AUDIT_CURRENT_DIR,
  attachPageProbes,
  formatList,
  getBrokenImages,
  getHorizontalOverflowDetails,
  preparePageForVisualCapture,
  viewportLabel,
  writeReport,
} from "./ui-audit.helpers";

test.describe("UI audit — homepage", () => {
  test("captures screenshot and checks layout integrity", async ({ page }, testInfo) => {
    const viewport = viewportLabel(testInfo);
    const probe = attachPageProbes(page);

    await page.goto("/", { waitUntil: "load" });
    await preparePageForVisualCapture(page);

    const screenshotName = `homepage-${viewport}.png`;
    const screenshotPath = path.join(AUDIT_CURRENT_DIR, screenshotName);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      animations: "disabled",
    });

    const overflow = await getHorizontalOverflowDetails(page);
    const brokenImages = await getBrokenImages(page);
    const isMobile = (page.viewportSize()?.width ?? 0) <= 390;

    if (isMobile) {
      await page
        .getByRole("button", { name: "Compare all features" })
        .click();
      const mobileComparison = page.locator("[data-comparison-mobile]");
      await expect(mobileComparison).toBeVisible();
      const comparisonOverflows = await mobileComparison.evaluate(
        (element) => element.scrollWidth > element.clientWidth + 1,
      );
      expect(
        comparisonOverflows,
        `Mobile comparison must not require horizontal scrolling at ${viewport}.`,
      ).toBe(false);
    }

    const report = [
      `# UI audit — homepage (${viewport})`,
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Screenshot",
      "",
      `- Saved to \`${screenshotPath}\``,
      "",
      "## Horizontal overflow",
      "",
      `- Client width: ${overflow.clientWidth}px`,
      `- Scroll width: ${overflow.scrollWidth}px`,
      `- Has overflow: ${overflow.hasOverflow ? "YES" : "no"}`,
      "",
      "Overflowing elements (sample):",
      formatList(overflow.overflowingSelectors),
      "",
      "## Broken images",
      "",
      formatList(brokenImages),
      "",
      "## Console errors",
      "",
      formatList(probe.consoleErrors),
      "",
      "## Failed requests",
      "",
      formatList(probe.failedRequests),
      "",
    ].join("\n");

    const reportPath = writeReport(`ui-audit-${viewport}.md`, report);
    await testInfo.attach(`ui-audit-${viewport}`, {
      path: reportPath,
      contentType: "text/markdown",
    });
    await testInfo.attach(screenshotName, {
      path: screenshotPath,
      contentType: "image/png",
    });

    // Readable summary in the Playwright list reporter.
    console.log(`\n[ui-audit ${viewport}]\n${report}`);

    expect(
      overflow.hasOverflow,
      [
        `Horizontal overflow at ${viewport}:`,
        `scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}`,
        formatList(overflow.overflowingSelectors, "No overflowing elements sampled."),
      ].join("\n"),
    ).toBe(false);

    expect(
      brokenImages,
      `Broken images at ${viewport}:\n${formatList(brokenImages)}`,
    ).toEqual([]);

    expect(
      probe.consoleErrors,
      `Console errors at ${viewport}:\n${formatList(probe.consoleErrors)}`,
    ).toEqual([]);

    expect(
      probe.failedRequests,
      `Failed requests at ${viewport}:\n${formatList(probe.failedRequests)}`,
    ).toEqual([]);
  });
});
