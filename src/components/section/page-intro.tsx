import { cn } from "@/lib/utils";

type PageIntroProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function PageIntro({ title, description, align = "left", className }: PageIntroProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
