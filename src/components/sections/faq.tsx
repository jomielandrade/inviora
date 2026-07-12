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
    <Section id="faq" tier="supporting" surface="ivory">
      <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="A few things couples often ask before starting a conversation with us."
          align="left"
        />

        <MotionReveal>
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
