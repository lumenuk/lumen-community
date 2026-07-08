import { Reveal } from "@/components/motion/reveal";
import { ProcessCard } from "@/components/cards/process-card";
import { journeySteps } from "@/lib/site-config";

export function ProcessSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {journeySteps.map((item, index) => (
        <Reveal key={item.step} delay={index * 0.08}>
          <ProcessCard step={item.step} title={item.title} description={item.description} />
        </Reveal>
      ))}
    </div>
  );
}
