import type  { Blog } from "../Hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div className="min-h-screen bg-terminal-bg">
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-7xl font-mono">
                <div className="col-span-8">
                    {/* Terminal log header */}
                    <div className="flex items-center text-terminal-green-dim text-xs mb-4">
                        <span className="text-terminal-green">[LOG_ENTRY]</span>
                        <span className="mx-2">|</span>
                        <span>ID: {blog.id.slice(0, 8)}...</span>
                        <span className="mx-2">|</span>
                        <span>TS: {new Date(blog.createdAt).toISOString()}</span>
                    </div>
                    
                    {/* Title */}
                    <div className="text-4xl font-bold text-terminal-green terminal-glow mb-4">
                        &gt; {blog.title}
                    </div>
                    
                    {/* Content */}
                    <div className="pt-4 text-terminal-green-dim leading-relaxed whitespace-pre-wrap">
                        {blog.content}
                    </div>
                    
                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-terminal-border/30 text-terminal-green-dark text-xs">
                        <span>[EOF]</span>
                        <span className="mx-4">[SIZE: {blog.content.length}B]</span>
                        <span>[STATUS: ARCHIVED]</span>
                    </div>
                </div>
                
                {/* Author sidebar */}
                <div className="col-span-4 pl-8">
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
                </div>
            </div>
        </div>
    </div>
}
