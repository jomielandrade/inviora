"use client";

import { useEffect, useState } from "react";

const MANILA_TIME_ZONE = "Asia/Manila";

type SampleDateProps = {
  format: "month" | "day" | "year" | "numeric" | "long";
};

function formatSampleDate(date: Date, format: SampleDateProps["format"]) {
  if (format === "numeric") {
    const parts = new Intl.DateTimeFormat("en-CA", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      timeZone: MANILA_TIME_ZONE,
    }).formatToParts(date);
    const value = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? "";

    return `${value("day")} · ${value("month")} · ${value("year")}`;
  }

  const options: Record<
    Exclude<SampleDateProps["format"], "numeric">,
    Intl.DateTimeFormatOptions
  > = {
    month: { month: "short" },
    day: { day: "2-digit" },
    year: { year: "numeric" },
    long: { day: "numeric", month: "long", year: "numeric" },
  };

  return new Intl.DateTimeFormat("en-PH", {
    ...options[format],
    timeZone: MANILA_TIME_ZONE,
  }).format(date);
}

export function SampleDate({ format }: SampleDateProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return <span suppressHydrationWarning>{formatSampleDate(now, format)}</span>;
}
