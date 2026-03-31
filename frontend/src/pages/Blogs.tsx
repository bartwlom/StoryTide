import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../Hooks";

export const Blogs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
        }
    }, [navigate]);
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className="min-h-screen bg-terminal-bg">
            <Appbar />
            <div className="flex justify-center pt-8">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div className="min-h-screen bg-terminal-bg">
        <Appbar />
        <div className="flex justify-center pt-4">
            <div className="w-full max-w-3xl">
                {/* Terminal command line */}
                <div className="flex justify-between items-center px-4 py-2 font-mono text-sm border-b border-terminal-border/30">
                    <span className="text-terminal-green-dim">
                        $ ls -la ~/system_logs/
                    </span>
                    <span className="text-terminal-green-dim">
                        TOTAL MEMORY ITEMS: {blogs.length}
                    </span>
                </div>
                
                {blogs.length === 0 ? (
                    <div className="terminal-box p-8 text-center mt-8 mx-4">
                        <div className="text-terminal-green text-xl font-mono mb-4 terminal-glow">
                            DIRECTORY_EMPTY
                        </div>
                        <div className="text-terminal-green-dim text-sm font-mono">
                            No system logs discovered in this partition. Run ./publish_new.sh to write.
                        </div>
                    </div>
                ) : (
                    blogs.map(blog => <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.createdAt}
                    />)
                )}
            </div>
        </div>
    </div>
}

