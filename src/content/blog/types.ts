export type BlogSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes: number;
  sections: BlogSection[];
};
