import type { Blog } from "../Hooks"
import { Appbar } from "./Appbar"

function formatSysDate(dateString?: string): string {
    if (!dateString) return "UNKNOWN_DATE";
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).replace(/ /g, '_');
    const timePart = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
    });
    return `${datePart}_${timePart}`;
}

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div className="min-h-screen py-4">
        <Appbar />
        <div className="flex justify-center px-4">
            <div className="w-full max-w-4xl border border-term-fg/30 bg-term-bg/50 mt-4 p-6 md:p-10 shadow-[0_0_15px_rgba(34,197,94,0.1)]">

                <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-term-fg/30 pb-4 gap-4">
                    <div>
                        <div className="text-3xl md:text-5xl font-bold text-glow mb-4 uppercase">
                            {blog.title}
                        </div>
                        <div className="opacity-70 font-mono text-sm">
                            [SYS_LOG: {formatSysDate(blog.createdAt)}]
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-center opacity-80 text-sm border-l-2 md:border-l-0 md:border-r-2 border-term-fg/50 pl-4 md:pl-0 md:pr-4">
                        <div className="mb-1">
                            <span className="opacity-50">AUTHOR: </span>
                            <span className="text-glow font-bold uppercase">{blog.author.name || "Anonymous_User"}</span>
                        </div>
                        <div className="opacity-50">
                            [ACCESS_LEVEL: PUBLIC]
                        </div>
                    </div>
                </div>

                <div className="font-mono text-base md:text-lg leading-relaxed whitespace-pre-wrap opacity-90 pl-2 md:pl-4 border-l border-term-fg/10">
                    {blog.content}
                </div>

                <div className="mt-16 pt-4 border-t border-term-fg/30 opacity-50 text-xs text-center font-bold tracking-widest">
                    [EOF] - END OF FILE
                </div>
            </div>
        </div>
    </div>
}
