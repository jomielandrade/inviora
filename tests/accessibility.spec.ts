import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  formatList,
  viewportLabel,
  writeReport,
} from "./ui-audit.helpers";

type AxeViolation = {
  id: string;
  impact?: string | null;
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{ target: string[]; failureSummary?: string }>;
};

const BLOCKING_IMPACTS = new Set(["serious", "critical"]);

function formatViolations(violations: AxeViolation[]): string {
  if (violations.length === 0) {
    return "No accessibility violations found.";
  }

  return violations
    .map((violation, index) => {
      const targets = violation.nodes
        .flatMap((node) => node.target)
        .slice(0, 8);
      return [
        `### ${index + 1}. ${violation.id} (${violation.impact ?? "unknown"})`,
        "",
        violation.help,
        "",
        `- Description: ${violation.description}`,
        `- Help: ${violation.helpUrl}`,
        `- Targets:`,
        formatList(targets, "None"),
        "",
      ].join("\n");
    })
    .join("\n");
}

test.describe("Accessibility audit — homepage", () => {
  test("runs Axe WCAG 2.1 A/AA scan", async ({ page }, testInfo) => {
    const viewport = viewportLabel(testInfo);

    // Prefer reduced motion so scroll-reveal opacity does not dilute measured
    // text colors and create false color-contrast failures.
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(300);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = results.violations as AxeViolation[];
    const blockingViolations = violations.filter((violation) =>
      BLOCKING_IMPACTS.has(violation.impact ?? ""),
    );
    const nonBlockingViolations = violations.filter(
      (violation) => !BLOCKING_IMPACTS.has(violation.impact ?? ""),
    );

    const report = [
      `# Accessibility audit — homepage (${viewport})`,
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      `## Summary`,
      "",
      `- Violations: ${violations.length}`,
      `- Serious/critical: ${blockingViolations.length}`,
      `- Minor/moderate: ${nonBlockingViolations.length}`,
      `- Incomplete: ${results.incomplete.length}`,
      `- Passes: ${results.passes.length}`,
      `- Inapplicable: ${results.inapplicable.length}`,
      "",
      "## Violations",
      "",
      formatViolations(violations),
      "",
    ].join("\n");

    const reportPath = writeReport(`a11y-${viewport}.md`, report);
    writeReport(
      `a11y-${viewport}.json`,
      JSON.stringify(
        {
          viewport,
          url: results.url,
          timestamp: results.timestamp,
          violationCount: violations.length,
          blockingViolationCount: blockingViolations.length,
          violations,
        },
        null,
        2,
      ),
    );

    await testInfo.attach(`a11y-${viewport}`, {
      path: reportPath,
      contentType: "text/markdown",
    });

    console.log(`\n[a11y ${viewport}]\n${report}`);

    if (nonBlockingViolations.length > 0) {
      testInfo.annotations.push({
        type: "a11y-non-blocking",
        description: `${nonBlockingViolations.length} minor/moderate violation(s) recorded in ${reportPath}`,
      });
    }

    expect(
      blockingViolations,
      [
        `Expected 0 serious/critical Axe violations at ${viewport}.`,
        `Found ${blockingViolations.length}:`,
        formatViolations(blockingViolations),
        `Full report: ${reportPath}`,
      ].join("\n"),
    ).toEqual([]);
  });
});
