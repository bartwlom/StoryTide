import { Avatar } from "./BlogCard"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const Appbar = ({ mode = "READ" }: { mode?: string }) => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return <div className="bg-terminal-header-bg border-b border-terminal-border">
        {/* Top header row */}
        <div className="flex justify-between px-6 py-3">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                <span className="font-mono text-xl font-bold text-terminal-green terminal-glow">
                    &gt;_ STORYTIDE
                </span>
            </Link>
            <div className="flex items-center gap-6 font-mono text-sm">
                <span className="text-terminal-green-dark">
                    MEM_UTIL: [<span className="text-terminal-green">542K/640K</span>]
                </span>
                <span className="text-terminal-green-dark">
                    SYS_TIME: {formatTime(currentTime)}
                </span>
            </div>
        </div>
        
        {/* Second row - terminal prompt */}
        <div className="flex justify-between items-center px-6 py-2 border-t border-terminal-border/30">
            <div className="flex items-center gap-2 font-mono text-terminal-green-dim">
                <span>~/storytide/root$</span>
                <span className="blink-cursor"></span>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-mono text-terminal-green-dark text-sm">
                    [MODE: {mode}]
                </span>
                <Link to={`/publish`}>
                    <button type="button" className="font-mono text-terminal-green border border-terminal-green px-3 py-1 hover:bg-terminal-green hover:text-terminal-bg transition-colors text-sm">
                        $ ./publish_new.sh
                    </button>
                </Link>
                <button 
                    onClick={handleLogout}
                    type="button" 
                    className="font-mono text-terminal-green-dark hover:text-terminal-green transition-colors text-sm"
                >
                    [logout]
                </button>
                <Avatar size={"big"} name="Hacker Singh" />
            </div>
        </div>
    </div>
}