"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/brand/logo";
import { MessengerButton } from "@/components/messenger-button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-ivory/85 backdrop-blur-md"
          : "border-b border-transparent bg-ivory/0"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <a
          href="#top"
          aria-label={`${siteConfig.name} home`}
          className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo variant="light" height={40} priority />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md text-sm font-medium text-navy/80 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <MessengerButton reference="header" variant="default">
            Message us
          </MessengerButton>
        </div>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger
            aria-label="Open menu"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-navy transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
            <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,88vw)] flex-col bg-ivory shadow-xl transition-transform duration-300 ease-out data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
              <div className="flex h-16 items-center justify-between border-b border-border px-5 sm:h-20">
                <Logo variant="light" height={36} />
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Close
                  aria-label="Close menu"
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-navy transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <X aria-hidden="true" className="size-5" />
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-3 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-4 text-base font-medium text-navy transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto border-t border-border p-5">
                <MessengerButton
                  reference="mobile-menu"
                  variant="default"
                  className="w-full"
                >
                  Message us
                </MessengerButton>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
