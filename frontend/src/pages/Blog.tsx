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
        return <div className="min-h-screen py-4">
            <Appbar />
            <div className="flex flex-col justify-center items-center h-[50vh]">
                <div className="mb-4 text-term-fg opacity-70">
                    $ ./read_file.sh {id}
                    <br />
                    &gt; Decoding memory sectors...
                </div>
                <Spinner />
            </div>
        </div>
    }

    return <FullBlog blog={blog} />
}