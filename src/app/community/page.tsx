import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { BlogCard } from "@/components/cards/blog-card";
import { NewsletterSignup } from "@/components/forms/newsletter-signup";
import { Button } from "@/components/ui/button";
import { socialIconComponents } from "@/components/layout/social-icons";
import { getAllPosts } from "@/lib/blog";
import { journeySteps, primaryCta, socialLinks } from "@/lib/site-config";

const membershipDetails = [
  {
    name: "One-to-one check-ins",
    description:
      "A proper sit-down with us, monthly or quarterly depending on what your business needs. And when something urgent comes up, we get on a call and get it done.",
  },
  {
    name: "A members' group chat",
    description:
      "Quick asks, honest answers, and member-to-member introductions that lead somewhere, between owners who get it.",
  },
  {
    name: "Meetups and events",
    description:
      "In-person London meetups and member events. Newsletter subscribers hear about them first.",
  },
  {
    name: "LinkedIn networking",
    description:
      "We work on your LinkedIn presence and connections alongside the community, so your network grows outside the room too.",
  },
];

export const metadata: Metadata = {
  title: "The Lumen Community",
  description:
    "A growing network of London business owners: monthly check-in support, member introductions, partner deals and perks, and a shared space to grow.",
};

export default function CommunityPage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Section tone="light">
        <PageIntro
          title="The Lumen Community"
          description="A growing network of London business owners who back each other. Built for owners who want people in their corner, not another subscription they forget about. Your first week is free, and founder members join with no tie-in."
        />
        <Reveal delay={0.08}>
          <div className="mt-8">
            <Button size="lg" variant="warm" render={<Link href={primaryCta.href} />}>
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {membershipDetails.map((item, index) => (
            <Reveal key={item.name} delay={(index % 2) * 0.06}>
              <div className="border-t border-foreground pt-5">
                <h2 className="text-xl font-semibold text-foreground">{item.name}</h2>
                <p className="mt-2.5 max-w-md text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How joining works */}
      <Section tone="charcoal">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">How joining works</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal-foreground/70">
            No obligation, no hard sell. Try your first week free and see if
            it&apos;s for you.
          </p>
        </Reveal>
        <ol className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.05}>
              <li className="border-t border-charcoal-foreground/25 pt-5">
                <span className="text-sm font-semibold text-warm">
                  Step {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-foreground/70">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Blog — visible immediately on page load */}
      <Section tone="muted">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Latest from Lumen</h2>
        </Reveal>
        {latestPosts.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.05}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.05}>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              No posts yet. Check back soon.
            </p>
          </Reveal>
        )}
        <div className="mt-10">
          <Button variant="outline" render={<Link href="/blog" />}>
            Read the blog
          </Button>
        </div>
      </Section>

      {/* Newsletter */}
      <Section tone="light">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">The newsletter</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            What&apos;s working for London businesses right now, community news, and
            member offers, straight to your inbox.
          </p>
          <div className="mt-7">
            <NewsletterSignup />
          </div>
        </Reveal>
      </Section>

      {/* Events and promotions */}
      <Section tone="charcoal">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Upcoming events and member offers
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal-foreground/70">
            Coming soon. Check back shortly, or subscribe to the newsletter and
            we&apos;ll tell you first.
          </p>
        </Reveal>
      </Section>

      {/* Social links */}
      <Section tone="light">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Follow along</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            The day-to-day of the community lives on social. Come and say hello.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            {socialLinks.map((social) => {
              const Icon = socialIconComponents[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Lumen Growth on ${social.name} (opens in a new tab)`}
                  className="flex items-center gap-2.5 border border-foreground px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-warm hover:text-warm-deep"
                >
                  <Icon />
                  {social.name}
                </a>
              );
            })}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
