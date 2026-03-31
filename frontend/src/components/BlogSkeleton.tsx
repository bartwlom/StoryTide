import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return <div role="status" className="animate-pulse font-mono">
        <div className="p-4 border-b border-terminal-border/30 pb-4 w-screen max-w-3xl cursor-pointer bg-terminal-card-bg/30">
            {/* Terminal log entry header skeleton */}
            <div className="flex items-center text-xs mb-2">
                <div className="h-3 bg-terminal-green-dark rounded w-10"></div>
                <span className="mx-2 text-terminal-green-dark">|</span>
                <div className="h-3 bg-terminal-green-dark rounded w-32"></div>
                <span className="mx-2 text-terminal-green-dark">|</span>
                <div className="h-3 bg-terminal-green-dark rounded w-20"></div>
            </div>
            
            {/* Author line skeleton */}
            <div className="flex items-center mb-2">
                <div className="h-6 w-6 bg-terminal-green-dark rounded-full"></div>
                <div className="h-3 bg-terminal-green-dark rounded w-24 ml-2"></div>
                <div className="flex pl-2 justify-center flex-col">
                    <Circle />
                </div>
                <div className="h-3 bg-terminal-green-dark rounded w-32 ml-2"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="pt-1">
                <div className="h-5 bg-terminal-green-dark rounded w-3/4"></div>
            </div>
            
            {/* Content preview skeleton */}
            <div className="mt-2 pl-4 border-l-2 border-terminal-green-dark">
                <div className="h-3 bg-terminal-green-dark rounded w-full mb-2"></div>
                <div className="h-3 bg-terminal-green-dark rounded w-5/6"></div>
            </div>
            
            {/* Footer info skeleton */}
            <div className="pt-3 flex items-center gap-4">
                <div className="h-3 bg-terminal-green-dark rounded w-20"></div>
                <div className="h-3 bg-terminal-green-dark rounded w-24"></div>
                <div className="h-3 bg-terminal-green-dark rounded w-28"></div>
            </div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
}
