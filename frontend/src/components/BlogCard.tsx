import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {

    const formattedDate = publishedDate.replace(/ /g, '_');
    const formattedTitle = title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const readTime = Math.max(1, Math.ceil(content.length / 100));

    return <Link to={`/blog/${id}`} className="block w-full max-w-4xl mx-auto border border-term-fg/20 hover:border-glow hover:bg-term-fg/5 p-4 mb-4 group transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs md:text-sm font-mono opacity-60 group-hover:opacity-100 mb-3 gap-2">
            <div className="flex items-center gap-3">
                <span className="text-term-glow">[-rw-r--r--]</span>
                <span>[SYS_LOG:{formattedDate}]</span>
                <div className="flex items-center gap-1">
                    <span className="opacity-50">usr:</span>
                    <span className="uppercase">{authorName.split(' ')[0]}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span>{readTime * 4.2}kb</span>
                <span>//</span>
                <span>{readTime} min read</span>
            </div>
        </div>

        <div className="text-lg md:text-xl font-bold text-glow mb-2 group-hover:pl-2 transition-all">
            <span className="opacity-50 mr-2 group-hover:text-term-bg group-hover:bg-term-glow group-hover:opacity-100 px-1">&gt;</span>
            {formattedTitle}.md
        </div>

        <div className="text-sm md:text-base opacity-70 line-clamp-2 pl-4 border-l border-term-fg/30">
            {content.slice(0, 150) + "..."}
        </div>
    </Link>
}

// Keeping Avatar for compatibility if used elsewhere, but styling it like a block
export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`inline-flex items-center justify-center bg-term-fg text-term-bg font-bold ${size === "small" ? "w-6 h-6 text-xs" : "w-10 h-10 text-lg"}`}>
        [{name[0].toUpperCase()}]
    </div>
}

export function Circle() {
    return <span className="opacity-50">.</span>
}