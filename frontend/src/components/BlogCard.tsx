import { Link } from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

function formatDate(dateString: string): string {
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

function calculateReadTime(content: string): number {
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-terminal-border/30 pb-4 w-full max-w-3xl cursor-pointer hover:bg-terminal-card-bg/50 hover:border-l-4 hover:border-l-terminal-green hover:shadow-[0_0_15px_rgba(74,222,128,0.15)] transition-all duration-200 font-mono">
            {/* Terminal log entry header */}
            <div className="flex items-center text-terminal-green-dim text-xs mb-2">
                <span className="text-terminal-green">[LOG]</span>
                <span className="mx-2">|</span>
                <span>{formatDate(publishedDate)}</span>
                <span className="mx-2">|</span>
                <span>ID: {id.slice(0, 8)}...</span>
            </div>
            
            {/* Author line */}
            <div className="flex items-center mb-2">
                <Avatar name={authorName} />
                <div className="pl-2 text-sm text-terminal-green">{authorName}</div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle />
                </div>
                <div className="pl-2 text-terminal-green-dim text-xs">
                    USER@{authorName.toLowerCase().replace(/\s/g, '_')}.local
                </div>
            </div>
            
            {/* Title */}
            <div className="text-lg font-semibold pt-1 text-terminal-green terminal-glow">
                &gt; {title}
            </div>
            
            {/* Content preview */}
            <div className="text-sm text-terminal-green-dim mt-2 pl-4 border-l-2 border-terminal-green-dark">
                {content.slice(0, 100) + "..."}
            </div>
            
            {/* Footer info */}
            <div className="text-terminal-green-dark text-xs font-mono pt-3 flex items-center gap-4">
                <span>[SIZE: {content.length}B]</span>
                <span>[READ_TIME: {calculateReadTime(content)}m]</span>
                <span className="text-terminal-green-dim">[STATUS: PUBLISHED]</span>
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-terminal-green-dim">
    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-terminal-green-dark border border-terminal-green rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-mono font-bold text-terminal-green`}>
            {(name?.[0] || "?").toUpperCase()}
        </span>
    </div>
}