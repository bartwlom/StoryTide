import type  { Blog } from "../Hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { useNavigate } from "react-router-dom";

function formatDate(dateString: string): string {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }) + " " + date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

function AuthorCard({ blog }: { blog: Blog }) {
    return (
        <div className="terminal-box p-4">
            <div className="text-terminal-green-dim text-xs mb-2">
                [USER_PROFILE]
            </div>
            <div className="flex w-full">
                <div className="pr-4 flex flex-col justify-center">
                    <Avatar size="big" name={blog.author.name || "Anonymous"} />
                </div>
                <div>
                    <div className="text-xl font-bold text-terminal-green">
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="text-terminal-green-dim text-xs mt-1">
                        USER@{(blog.author.name || "anonymous").toLowerCase().replace(/\s/g, '_')}.local
                    </div>
                </div>
            </div>
            <div className="pt-4 text-terminal-green-dim text-sm border-t border-terminal-border/30 mt-4">
                <span className="text-terminal-green">$</span> echo "Author of system logs and digital narratives"
            </div>
        </div>
    );
}

export const FullBlog = ({ blog }: {blog: Blog}) => {
    const navigate = useNavigate();
    
    if (!blog) {
        return <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
            <div className="text-terminal-green terminal-glow text-xl">Blog post not found</div>
        </div>;
    }
    
    return <div className="min-h-screen bg-terminal-bg">
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 px-4 lg:px-10 w-full pt-20 max-w-7xl font-mono">
                {/* Back button - visible on all screens */}
                <div className="col-span-1 lg:col-span-8 mb-4">
                    <button 
                        onClick={() => navigate('/blogs')}
                        className="text-terminal-green-dim hover:text-terminal-green text-sm font-mono flex items-center gap-2 transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">$</span>
                        <span>cd ../blogs</span>
                    </button>
                </div>
                
                {/* Spacer for grid alignment on desktop */}
                <div className="hidden lg:block lg:col-span-4"></div>
                
                <div className="col-span-1 lg:col-span-8">
                    {/* Terminal log header */}
                    <div className="flex items-center text-terminal-green-dim text-xs mb-4 flex-wrap gap-2">
                        <span className="text-terminal-green">[LOG_ENTRY]</span>
                        <span>|</span>
                        <span>ID: {blog.id.slice(0, 8)}...</span>
                        <span>|</span>
                        <span>TS: {formatDate(blog.createdAt)}</span>
                    </div>
                    
                    {/* Title */}
                    <div className="text-2xl lg:text-4xl font-bold text-terminal-green terminal-glow mb-4">
                        &gt; {blog.title}
                    </div>
                    
                    {/* Author info - mobile only (shown above content on small screens) */}
                    <div className="lg:hidden mb-6">
                        <AuthorCard blog={blog} />
                    </div>
                    
                    {/* Content */}
                    <div className="pt-4 text-terminal-green-dim leading-relaxed whitespace-pre-wrap wrap-break-words">
                        {blog.content}
                    </div>
                    
                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-terminal-border/30 text-terminal-green-dark text-xs">
                        <span>[EOF]</span>
                        <span className="mx-4">[SIZE: {blog.content.length}B]</span>
                        <span>[STATUS: ARCHIVED]</span>
                    </div>
                </div>
                
                {/* Author sidebar - desktop only */}
                <div className="hidden lg:block lg:col-span-4 pl-8">
                    <AuthorCard blog={blog} />
                </div>
            </div>
        </div>
    </div>
}
