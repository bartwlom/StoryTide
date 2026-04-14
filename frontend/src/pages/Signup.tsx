import { useState, useEffect } from "react";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };
        
        updateTime();
        const interval = setInterval(updateTime, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-terminal-bg flex flex-col">
            {/* Terminal Header */}
            <div className="border-b border-terminal-green px-6 py-3">
                <div className="flex justify-between items-center font-mono text-sm">
                    <div className="flex flex-row justify-center items-center gap-3">
                        <img src="/storytide logo.svg" alt="StoryTide Logo" className="w-8 h-8 object-contain" />
                        <span className="font-mono text-xl font-bold text-terminal-green terminal-glow tracking-wider">
                            STORYTIDE
                        </span>
                    </div>
                    <div className="flex gap-6 text-terminal-green-dim">
                        <span>MEM_UTIL: [608K/640K]</span>
                        <span>SYS_TIME: {currentTime}</span>
                    </div>
                </div>
            </div>

            {/* Path Prompt */}
            <div className="px-6 py-2 font-mono text-terminal-green text-sm">
                ~/storytide/root$ <span className="blink-cursor"></span>
            </div>

            {/* Main Content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-start pt-8">
                <div>
                    <Auth type={"signup"} />
                </div>
                <div className="hidden lg:block h-full">
                    <Quote />
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-terminal-green px-6 py-3">
                <div className="flex justify-between items-center font-mono text-xs text-terminal-green-dim">
                    <span>(c) 198X STORYTIDE SYSTEMS</span>
                    <span>SYSTEM.OK</span>
                </div>
            </div>
        </div>
    );
}
