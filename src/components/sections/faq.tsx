import { ArrowRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { MotionReveal } from "@/components/motion-reveal";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, messengerUrl } from "@/lib/site-config";

function FaqSupportNote() {
  return (
    <MotionReveal delay={0.12}>
      <aside className="max-w-md">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Still have a question? Tell us what you&apos;re planning and
          we&apos;ll help you find the right setup.{" "}
          <a
            href={messengerUrl("faq")}
            target="_blank"
            rel="noopener noreferrer"
            className="group/faq-cta inline-flex items-center gap-1 font-semibold text-navy underline-offset-4 transition-colors hover:text-navy/80 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Start a conversation
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/faq-cta:translate-x-0.5"
            />
          </a>
        </p>
      </aside>
    </MotionReveal>
  );
}

function FaqAccordionItem({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: string;
}) {
  const label = String(index + 1).padStart(2, "0");

  return (
    <AccordionItem value={question}>
      <AccordionTrigger>
        <span className="flex min-w-0 items-start gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="pt-1 font-sans text-[0.6875rem] font-semibold tabular-nums tracking-[0.18em] text-muted-foreground sm:text-xs"
          >
            {label}
          </span>
          <span className="min-w-0 text-pretty">{question}</span>
        </span>
      </AccordionTrigger>
      <AccordionPanel>
        <div className="pl-9 sm:pl-10">{answer}</div>
      </AccordionPanel>
    </AccordionItem>
  );
}

export function Faq() {
  return (
    <Section id="faq" tier="supporting" surface="ivory">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:items-start lg:gap-x-14 xl:gap-x-16">
        <div className="max-w-md lg:max-w-none">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            description="A few things couples often ask before starting their invitation with Inviora."
            align="left"
            className="gap-3 sm:gap-4"
          />
          <div className="mt-8 sm:mt-10">
            <FaqSupportNote />
          </div>
        </div>

        <MotionReveal delay={0.06} className="min-w-0">
          <Accordion className="border-t border-border/60">
            {faqs.map((faq, index) => (
              <FaqAccordionItem
                key={faq.question}
                index={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </Accordion>
        </MotionReveal>
      </div>
    </Section>
  );
}
