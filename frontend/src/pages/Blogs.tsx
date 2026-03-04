
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className="min-h-screen py-4">
            <Appbar />
            <div className="flex flex-col items-center px-4">
                <div className="w-full max-w-4xl opacity-50 mb-2 font-mono text-xs">
                    $ ./fetch_logs.sh
                    <br />
                    &gt; Scanning system sectors for memory files...
                </div>
                <div className="w-full max-w-4xl flex flex-col gap-2 mt-4">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div className="min-h-screen py-4">
        <Appbar />
        <div className="flex flex-col items-center px-4">
            <div className="w-full max-w-4xl opacity-70 mb-4 font-mono text-xs md:text-sm flex justify-between border-b border-term-fg/30 pb-2">
                <div>
                    $ ls -la ~/system_logs/
                </div>
                <div>
                    TOTAL MEMORY ITEMS: {blogs.length}
                </div>
            </div>

            <div className="w-full max-w-4xl flex flex-col">
                {blogs.length === 0 ? (
                    <div className="p-8 text-center text-term-fg border border-term-fg/30 border-dashed opacity-70 my-8">
                        <p className="text-xl font-bold mb-2">DIRECTORY_EMPTY</p>
                        <p className="text-sm border-t border-term-fg/30 pt-2 inline-block">No system logs discovered in this partition. Run ./publish_new.sh to write.</p>
                    </div>
                ) : (
                    blogs.map(blog => <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous_User"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.createdAt || "2nd December 2023"}
                    />)
                )}
            </div>
        </div>
    </div>
}

export default Blogs;
