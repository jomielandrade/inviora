"use client";

import { useState } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { comparisonRows, packages } from "@/lib/site-config";

const columns = packages.map((pkg) => ({
  id: pkg.id,
  name: pkg.name,
  price: pkg.price,
}));

export function Comparison() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <div className="flex justify-center">
          <Collapsible.Trigger
            className={cn(
              "group/compare inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-navy transition-colors hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            )}
          >
            {open ? "Hide full comparison" : "Compare all features"}
            <ChevronDown
              aria-hidden="true"
              className="size-4 text-blue transition-transform duration-300 group-data-[panel-open]/compare:rotate-180"
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_40px_-36px_rgba(14,27,61,0.3)]">
            {/* Grouped rows on small screens — no horizontal scroll (H-03). */}
            <div
              data-comparison-mobile
              className="divide-y divide-border md:hidden"
            >
              {comparisonRows.map((row) => (
                <section key={row.feature} className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-navy">
                    {row.feature}
                  </h3>
                  <dl className="mt-4 grid gap-3 text-sm">
                    <MobileComparisonValue
                      packageName={columns[0].name}
                      value={row.essential}
                    />
                    <MobileComparisonValue
                      packageName={columns[1].name}
                      value={row.signature}
                      emphasized
                    />
                    <MobileComparisonValue
                      packageName={columns[2].name}
                      value={row.bespoke}
                    />
                  </dl>
                </section>
              ))}
            </div>

            <table className="hidden w-full table-fixed border-collapse text-left text-sm md:table">
              <caption className="sr-only">
                Feature comparison across Inviora packages
              </caption>
              <colgroup>
                <col className="w-[34%]" />
                <col className="w-[22%]" />
                <col className="w-[22%]" />
                <col className="w-[22%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-navy/80 bg-navy text-ivory">
                  <th
                    scope="col"
                    className="p-4 font-heading text-base font-semibold text-ivory"
                  >
                    Feature
                  </th>
                  {columns.map((column) => {
                    const isSignature = column.id === "signature";
                    return (
                      <th
                        key={column.id}
                        scope="col"
                        className={cn(
                          "p-4 align-bottom font-heading text-base font-semibold text-ivory",
                          isSignature && "bg-gold/20"
                        )}
                      >
                        <span className="block">{column.name}</span>
                        <span className="mt-1 block font-sans text-sm font-semibold tabular-nums tracking-tight text-gold">
                          {column.price}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-b border-border last:border-b-0",
                      index % 2 === 1 && "bg-muted/40"
                    )}
                  >
                    <th
                      scope="row"
                      className="p-4 text-left font-medium text-navy"
                    >
                      {row.feature}
                    </th>
                    <ComparisonCell value={row.essential} />
                    <ComparisonCell value={row.signature} emphasized />
                    <ComparisonCell value={row.bespoke} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  );
}

function MobileComparisonValue({
  packageName,
  value,
  emphasized = false,
}: {
  packageName: string;
  value: string;
  emphasized?: boolean;
}) {
  const notIncluded = value === "Not included";

  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 rounded-lg px-3 py-2",
        emphasized && "bg-gold/10"
      )}
    >
      <dt className="font-semibold text-navy">{packageName}</dt>
      <dd className={notIncluded ? "text-muted-foreground" : "text-navy/90"}>
        {value}
      </dd>
    </div>
  );
}

function ComparisonCell({
  value,
  emphasized = false,
}: {
  value: string;
  emphasized?: boolean;
}) {
  const notIncluded = value === "Not included";
  return (
    <td
      className={cn(
        "p-4 align-top",
        notIncluded ? "text-muted-foreground" : "text-navy/90",
        emphasized && "bg-gold/10"
      )}
    >
      {value}
    </td>
  );
}
