import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section/section";
import { PostActions } from "@/components/blog/post-actions";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { BlogSection } from "@/content/blog/types";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function renderSection(section: BlogSection, index: number) {
  if (section.type === "heading") {
    return (
      <h2 key={index} className="mt-10 text-xl font-semibold text-foreground">
        {section.text}
      </h2>
    );
  }

  if (section.type === "list") {
    return (
      <ul key={index} className="mt-4 list-disc space-y-2 pl-5">
        {section.items.map((item) => (
          <li key={item} className="text-base leading-relaxed text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="mt-4 text-base leading-relaxed text-muted-foreground">
      {section.text}
    </p>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Section tone="light" containerClassName="max-w-3xl">
      <p className="text-sm font-medium text-muted-foreground">
        {formatDate(post.publishedAt)} · {post.readingTimeMinutes} min read
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-8">
        {post.sections.map((section, index) => renderSection(section, index))}
      </div>
      <PostActions slug={post.slug} title={post.title} />
      <div className="mt-10">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All insights
        </Link>
      </div>
    </Section>
  );
}
