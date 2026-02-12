import { getWordPressPostBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import type { Metadata } from "next";


export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post: any = await getWordPressPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.createdAt,
            authors: ["Sharik Rasool"],
            images: post.coverImage ? [post.coverImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post: any = await getWordPressPostBySlug(slug);

    if (!post || post.status !== 'published') {
        // If not published, maybe 404? Or require auth? 
        // For now, simple 404 for public.
        // Ideally, we check auth if draft, but let's keep it simple.
        // If I am admin, I might want to preview it using a different route or middleware logic?
        // Simply showing 404 for now if not published.
        // Wait, if I am admin, I want to see it.
        // But this is public page.
        if (post?.status !== 'published') {
            notFound();
        }
    }

    return (
        <article className="section">
            <div className="container-narrow">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>

                {/* Featured Image */}
                {post.coverImage && (
                    <div className="mb-8">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                )}

                {/* Article Header */}
                <header className="mb-8">
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-primary mb-4">
                            <Tag className="h-4 w-4" />
                            {post.tags[0]}
                        </div>
                    )}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Sharik Rasool
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </header>

                {/* Article Content */}
                <div
                    className="prose-custom prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-border">
                        <h3 className="text-lg font-semibold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
