export const Quote = () => {
    return (
        <div className="p-8">
            <div className="terminal-box w-full max-w-md p-6 relative">
                <div className="absolute top-0 right-0 bg-terminal-green text-terminal-bg px-2 py-1 text-xs font-mono">
                    /etc/motd
                </div>
                <div className="mt-4 font-mono">
                    <div className="text-terminal-green mb-4">
                        $ cat ./about_storytide.txt
                    </div>
                    <div className="text-terminal-green text-base leading-relaxed mb-3">
                        "StoryTide is a modern blogging platform that combines the nostalgia of terminal interfaces with modern web capabilities."
                    </div>
                    <div className="text-terminal-green-dim text-sm mb-4">
                        Built with React, TypeScript, Cloudflare Workers, and PostgreSQL.
                    </div>
                    <div className="text-terminal-green text-sm mb-2">
                        &gt;_ WHY_WE_BUILD_IT:
                    </div>
                    <div className="text-terminal-green-dim text-xs leading-relaxed">
                        To create a flowing current of stories, ideas, and knowledge that connects writers and readers across the digital landscape. Whether you're a developer documenting your journey or a writer exploring new ideas, StoryTide provides the perfect canvas.
                    </div>
                    <div className="text-terminal-green-dark text-xs mt-4">
                        &gt;&gt; STATUS: READY_FOR_YOUR_STORIES
                    </div>
                </div>
            </div>
        </div>
    );
}
