export const BlogSkeleton = () => {
    return <div role="status" className="animate-pulse w-full max-w-4xl mx-auto border border-term-fg/10 p-4 mb-4 pointer-events-none">
        <div className="flex flex-col md:flex-row justify-between mb-3 gap-2 opacity-50">
            <div className="flex items-center gap-3">
                <div className="h-4 bg-term-fg/20 w-24"></div>
                <div className="h-4 bg-term-fg/20 w-32"></div>
                <div className="h-4 bg-term-fg/20 w-16"></div>
            </div>
            <div className="flex items-center gap-3">
                <div className="h-4 bg-term-fg/20 w-24"></div>
            </div>
        </div>

        <div className="mb-4">
            <div className="h-6 md:h-8 bg-term-fg/30 w-3/4 max-w-md"></div>
        </div>

        <div className="pl-4 border-l border-term-fg/10 space-y-2">
            <div className="h-4 bg-term-fg/10 w-full"></div>
            <div className="h-4 bg-term-fg/10 w-5/6"></div>
            <div className="h-4 bg-term-fg/10 w-4/6"></div>
        </div>
        <span className="sr-only">Loading memory banks...</span>
    </div>
}
