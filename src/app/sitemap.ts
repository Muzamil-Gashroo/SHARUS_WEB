import { MetadataRoute } from "next";
import { getWordPressPosts } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getWordPressPosts();
    const publishedPosts = posts.filter((post: any) => post.status === "published");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sharikrasool.com";

    const staticPages = [
        "",
        "/projects",
        "/contact",
        "/blog",
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    const dynamicPages = publishedPosts.map((post: any) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...dynamicPages];
}
