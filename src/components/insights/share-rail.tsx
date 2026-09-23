import { LinkedInIcon } from "@/components/layout/social-icons";

/* Vertical share rail that sits to the left of an Insights article (Financial
   Times-style). Server-rendered share intents — no client JS. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareRail({ url, title }: { url: string; title: string }) {
  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);
  const links = [
    {
      name: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      Icon: XIcon,
    },
    {
      name: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      Icon: LinkedInIcon,
    },
  ];

  return (
    <div className="flex gap-3 lg:sticky lg:top-28 lg:flex-col">
      {links.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} (opens in a new tab)`}
          className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-[#3B3BD9]/60 hover:text-accent-ink"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}
