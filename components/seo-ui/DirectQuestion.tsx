import type { DirectFollowUp } from "@/data/directAnswers";

interface DirectQuestionProps {
  item: DirectFollowUp;
}

export function DirectQuestion({ item }: DirectQuestionProps) {
  return (
    <section className="border border-deep-navy/10 border-l-[3px] border-l-starlight-gold bg-parchment px-4 py-3">
      <h2 className="break-keep font-sans text-base font-semibold leading-snug text-deep-navy">
        {item.question}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-deep-navy/75">
        {item.answer}
      </p>
    </section>
  );
}
