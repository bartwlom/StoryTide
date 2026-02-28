import { useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../Hooks"
<<<<<<< HEAD
import { useParams } from "react-router-dom";
=======
import { useParams, useNavigate } from "react-router-dom";
>>>>>>> 405a905d4844de5084c05985b84959c94dd2a835

export const Blog = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
        }
    }, [navigate]);
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div className="min-h-screen py-4">
            <Appbar />
<<<<<<< HEAD
            <div className="flex flex-col justify-center items-center h-[50vh]">
                <div className="mb-4 text-term-fg opacity-70">
                    $ ./read_file.sh {id}
                    <br />
                    &gt; Decoding memory sectors...
=======

            <div className="h-screen flex flex-col justify-center">

                <div className="flex justify-center">
                    <Spinner />
>>>>>>> 405a905d4844de5084c05985b84959c94dd2a835
                </div>
                <Spinner />
            </div>
        </div>
    }

    return <FullBlog blog={blog} />
}