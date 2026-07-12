import { MessageCircle } from "lucide-react";

import { Container } from "@/components/section";
import { Logo } from "@/components/brand/logo";
import { navLinks, siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy text-ivory">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="dark" height={44} />
            <p className="mt-5 text-sm leading-relaxed text-ivory/70">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:pt-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-md text-sm text-ivory/80 transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:pt-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Connect
            </h2>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-ivory/80 transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gold/50"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              Message us on Facebook
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
