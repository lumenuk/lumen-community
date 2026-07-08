import type { Metadata } from "next";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { BlogCard } from "@/components/cards/blog-card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical, London-specific marketing insights for dental, healthcare, property, construction, fitness, and beauty businesses.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <Section tone="light">
      <PageIntro
        title="Insights"
        description="Practical notes on visibility, trust, and local marketing, written for business owners rather than marketers."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={(index % 3) * 0.05}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
