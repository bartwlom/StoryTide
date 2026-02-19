import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../Hooks";

export const Blogs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
        }
    }, [navigate]);
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        <p className="text-xl">Oh Noo ! No Blogs Found</p>
                        <p className="text-sm mt-2">Be The First In Your Bloodline To Write A Blog</p>
                    </div>
                ) : (
                    blogs.map(blog => <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.createdAt}
                    />)
                )}
            </div>
        </div>
    </div>
}

