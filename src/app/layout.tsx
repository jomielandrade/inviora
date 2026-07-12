import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// Resolves relative metadata image URLs. Uses an env-provided site URL when
// available and falls back to localhost for development; no domain is hardcoded.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Inviora | Beautiful Digital Invitations & RSVP Experiences",
  description:
    "Elegant digital wedding invitations and simpler RSVP experiences for modern celebrations.",
  applicationName: "Inviora",
  openGraph: {
    title: "Inviora | Beautiful Digital Invitations & RSVP Experiences",
    description:
      "Elegant digital wedding invitations and simpler RSVP experiences for modern celebrations.",
    siteName: "Inviora",
    type: "website",
    images: [
      {
        url: "/brand/inviora-logo-light.png",
        width: 2788,
        height: 1625,
        alt: "Inviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inviora | Beautiful Digital Invitations & RSVP Experiences",
    description:
      "Elegant digital wedding invitations and simpler RSVP experiences for modern celebrations.",
    images: ["/brand/inviora-logo-light.png"],
  },
  icons: {
    icon: "/brand/inviora-logo-light.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", manrope.variable, cormorant.variable)}
    >
      <head>
        <noscript>
          {/* Keep reveal-animated content visible when JavaScript is disabled. */}
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
