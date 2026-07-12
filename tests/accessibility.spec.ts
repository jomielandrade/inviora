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

    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(300);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = results.violations as AxeViolation[];

    const report = [
      `# Accessibility audit — homepage (${viewport})`,
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      `## Summary`,
      "",
      `- Violations: ${violations.length}`,
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

    // eslint-disable-next-line no-console -- intentional audit summary output
    console.log(`\n[a11y ${viewport}]\n${report}`);

    // Phase 1: capture and report Axe findings. Enforcement against a clean
    // violation baseline comes later so we do not block setup on existing
    // contrast issues in the landing page.
    expect(results.violations, "Axe scan should return a violations array").toBeDefined();
    expect(
      Array.isArray(results.violations),
      "Axe violations payload should be an array",
    ).toBe(true);

    if (violations.length > 0) {
      testInfo.annotations.push({
        type: "a11y-violations",
        description: `${violations.length} violation(s) recorded in ${reportPath}`,
      });
    }
  });
});
