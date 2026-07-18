import { ArrowUp, ExternalLink, MessageCircle } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const FOOTER_BRAND_DESCRIPTION =
  "Digital wedding invitations and simpler RSVP experiences.";

type FooterNavGroupProps = {
  title: string;
  children: React.ReactNode;
};

function FooterNavGroup({ title, children }: FooterNavGroupProps) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

const footerLinkClass =
  "inline-flex items-center rounded-sm py-1 text-sm text-on-navy-muted underline-offset-4 transition-colors hover:text-ivory hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/50";

const utilityLinkClass =
  "group/back-to-top inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-medium text-on-navy-muted underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/50";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 sm:mt-8">
      <div aria-hidden="true" className="mb-6 h-px w-full bg-gold/25 sm:mb-8" />

      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.55fr)_minmax(0,0.75fr)] lg:gap-x-6">
        <div className="max-w-xs self-start sm:col-span-2 lg:col-span-1">
          <Logo
            variant="dark"
            height={52}
            className="block w-20 md:w-24"
          />
          <p className="mt-2 font-heading text-[0.9375rem] leading-snug text-ivory">
            {siteConfig.tagline}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-on-navy-muted">
            {FOOTER_BRAND_DESCRIPTION}
          </p>
        </div>

        <FooterNavGroup title="Explore">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLinkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </FooterNavGroup>

        <FooterNavGroup title="Connect">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(footerLinkClass, "group/facebook gap-2")}
          >
            <MessageCircle
              aria-hidden="true"
              className="size-4 shrink-0 text-on-navy-muted"
            />
            <span className="inline-flex items-center gap-1.5">
              Facebook Messenger
              <ExternalLink
                aria-hidden="true"
                className="size-3.5 shrink-0 text-on-navy-muted motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/facebook:-translate-y-px motion-safe:group-hover/facebook:translate-x-px"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </span>
          </a>
        </FooterNavGroup>
      </div>

      <div className="mt-5 flex flex-col gap-1.5 border-t border-gold/20 pt-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-4">
        <p className="text-sm text-on-navy-subtle">
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </p>
        <a href="#home" className={utilityLinkClass}>
          Back to top
          <ArrowUp
            aria-hidden="true"
            className="size-3.5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/back-to-top:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
