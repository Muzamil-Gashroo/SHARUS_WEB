import { getWordPressPosts } from "@/lib/wordpress";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SEO Blog | Sharik Rasool",
    description: "SEO insights, link building strategies, and content marketing tips.",
    alternates: {
        canonical: "/blog",
    },
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await getWordPressPosts();
    const publishedPosts = posts.filter((post: any) => post.status === 'published');

    return (
        <section className="section">
            <div className="container-wide">
                {/* HEADER */}
                <FadeIn>
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold mb-4">
                            SEO <span className="text-primary">Blog</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Actionable SEO strategies that actually work.
                        </p>
                    </div>
                </FadeIn>

                {/* POSTS */}
                {publishedPosts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No posts found. check back later!
                    </div>
                ) : (
                    <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {publishedPosts.map((post: any) => (
                            <StaggerItem key={post._id} className="h-full">
                                <Link href={`/blog/${post.slug}`} className="block h-full">
                                    <Card className="hover:shadow-md transition h-full flex flex-col">
                                        <CardContent className="p-6 flex flex-col h-full">
                                            <div className="flex-1">
                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="flex items-center gap-2 text-primary text-sm mb-3">
                                                        <Tag className="h-4 w-4" />
                                                        {post.tags[0]}
                                                    </div>
                                                )}

                                                <h3 className="text-xl font-semibold mb-3">
                                                    {post.title}
                                                </h3>

                                                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1 text-primary">
                                                    Read More <ArrowRight className="h-3 w-3" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                )}
            </div>
        </section>
    );
}
