import { Container } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import { MessengerButton } from "@/components/messenger-button";
import { Logo } from "@/components/brand/logo";

export function FinalCta() {
  return (
    <section className="bg-navy py-20 text-ivory sm:py-24">
      <Container>
        <MotionReveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Logo variant="dark" height={52} />
          <h2 className="mt-8 font-heading text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            Ready to make inviting feel simpler?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg">
            Tell us about your celebration and we&apos;ll help you choose the right
            Inviora experience.
          </p>
          <div className="mt-8">
            <MessengerButton
              reference="final-cta"
              variant="default"
              className="bg-gold text-navy hover:bg-gold/90 focus-visible:ring-gold/50"
            >
              Message Inviora
            </MessengerButton>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
