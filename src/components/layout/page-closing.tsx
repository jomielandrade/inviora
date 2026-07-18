import { Container } from "@/components/section";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/layout/footer";

/**
 * Unified page ending: one navy surface + one shared max-w-6xl container
 * so the CTA, footer columns, divider, and legal row share the same edges.
 */
export function PageClosing() {
  return (
    <div className="closing-surface text-ivory">
      <Container className="py-10 sm:py-12">
        <FinalCta />
        <Footer />
      </Container>
    </div>
  );
}
