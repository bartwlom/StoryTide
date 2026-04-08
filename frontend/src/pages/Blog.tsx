import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../Hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div className="min-h-screen bg-terminal-bg">
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner message="LOADING_BLOG_ENTRY" />
                </div>
            </div>
        </div>
    }
    return <div className="min-h-screen bg-terminal-bg">
        <FullBlog blog={blog} />
    </div>
}