import type { Blog } from "../Hooks"
import { Appbar } from "./Appbar"

<<<<<<< HEAD
export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div className="min-h-screen py-4">
        <Appbar />
        <div className="flex justify-center px-4">
            <div className="w-full max-w-4xl border border-term-fg/30 bg-term-bg/50 mt-4 p-6 md:p-10 shadow-[0_0_15px_rgba(34,197,94,0.1)]">

                {/* Header Information Log */}
                <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-term-fg/30 pb-4 gap-4">
                    <div>
                        <div className="text-3xl md:text-5xl font-bold text-glow mb-4 uppercase">
                            {blog.title}
                        </div>
                        <div className="opacity-70 font-mono text-sm">
                            [SYS_LOG: 2nd_December_2023]
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

                {/* Blog Content View */}
                <div className="font-mono text-base md:text-lg leading-relaxed whitespace-pre-wrap opacity-90 pl-2 md:pl-4 border-l border-term-fg/10">
                    {blog.content}
                </div>

                {/* End of File Marker */}
                <div className="mt-16 pt-4 border-t border-term-fg/30 opacity-50 text-xs text-center font-bold tracking-widest">
                    [EOF] - END OF FILE
                </div>
=======
function formatFullDate(dateString: string): string {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return `Published on ${datePart} at ${timePart}`;
}

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-7xl">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        {formatFullDate(blog.createdAt)}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>

>>>>>>> 405a905d4844de5084c05985b84959c94dd2a835
            </div>
        </div>
    </div>
}
    