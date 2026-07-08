import type { BlogPost } from "@/content/blog/types";
import { googleBusinessProfileForClinics } from "@/content/blog/posts/google-business-profile-for-clinics";
import { reviewsAndTrustForTrades } from "@/content/blog/posts/reviews-and-trust-for-trades";
import { linkedinForPropertyAndB2b } from "@/content/blog/posts/linkedin-for-property-and-b2b";

const allPosts: BlogPost[] = [
  linkedinForPropertyAndB2b,
  reviewsAndTrustForTrades,
  googleBusinessProfileForClinics,
];

export function getAllPosts(): BlogPost[] {
  return [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}
