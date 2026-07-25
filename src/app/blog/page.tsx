import type { Metadata } from "next";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { BlogCard } from "@/components/cards/blog-card";
import { NewsletterSignup } from "@/components/forms/newsletter-signup";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on visibility, trust, and growing a London business, written for business owners rather than marketers.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section tone="light">
        <PageIntro
          title="The Lumen blog"
          description="Practical notes on visibility, trust, and growing a London business, written for business owners rather than marketers."
        />
        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 0.05}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-base leading-relaxed text-muted-foreground">
            No posts yet. Check back soon.
          </p>
        )}
      </Section>

      <Section tone="muted">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Get it by email instead</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            The newsletter carries the same practical notes, plus community news and
            member offers.
          </p>
          <div className="mt-7">
            <NewsletterSignup />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
