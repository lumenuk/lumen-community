import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/cta";

type PageIntroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  eyebrowColor?: string;
  align?: "left" | "center";
  className?: string;
};

export function PageIntro({
  title,
  description,
  eyebrow,
  eyebrowColor,
  align = "left",
  className,
}: PageIntroProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <Eyebrow color={eyebrowColor} bar={align === "left"}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h1 className="font-serif text-[34px] leading-[1.08] font-normal tracking-[-0.02em] text-balance text-[#0A0A0C] sm:text-[42px] lg:text-[50px]">
        {title}
      </h1>
      {description ? (
        <p className="text-[19px] leading-[1.6] text-[#4A4A55]">{description}</p>
      ) : null}
    </div>
  );
}
