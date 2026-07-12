import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/site-config";

export function Faq() {
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="A few things couples often ask before starting a conversation with us."
        />

        <MotionReveal className="mt-12">
          <Accordion>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionPanel>{faq.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionReveal>
      </div>
    </Section>
  );
}
