import { useState, useEffect } from "react";
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = () => {
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
                    <div className="text-terminal-green font-bold text-lg">
                        &gt;_ STORYTIDE<span className="blink-cursor"></span>
                    </div>
                    <div className="flex gap-6 text-terminal-green-dim">
                        <span>MEM_UTIL: [629K/640K]</span>
                        <span>SYS_TIME: {currentTime}</span>
                    </div>
                </div>
            </div>

            {/* Path Prompt */}
            <div className="px-6 py-2 font-mono text-terminal-green text-sm">
                ~/storytide/root$ <span className="inline-block w-2 h-4 bg-terminal-green animate-pulse"></span>
            </div>

            {/* Main Content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <Auth type={"signin"} />
                </div>
                <div className="hidden lg:block">
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
