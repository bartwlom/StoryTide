import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
<<<<<<< HEAD
    return <div className="border border-term-fg/30 flex justify-between items-center px-4 md:px-8 py-3 mb-8 bg-term-bg/50 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-6">
            <Link to={'/blogs'} className="hover:text-term-bg hover:bg-term-fg px-2 py-1 transition-colors font-bold tracking-widest uppercase text-glow">
                StoryTide_
            </Link>

            <div className="hidden md:flex gap-4 opacity-70 text-sm">
                <span>[MODE: READ]</span>
                <span>[ENV: PROD]</span>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <Link to={`/publish`} className="border border-term-fg px-3 py-1 hover:bg-term-fg hover:text-term-bg transition-colors flex items-center gap-2">
                <span className="opacity-50">$</span>
                ./publish_new.sh
            </Link>

            <div className="flex items-center gap-2 hidden sm:flex">
                <Avatar size={"small"} name="root" />
            </div>
        </div>
=======
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-bold text-xl">
            StoryTide
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>

            <Avatar size={"big"} name="User" />
        </div>
>>>>>>> 405a905d4844de5084c05985b84959c94dd2a835
    </div>
}