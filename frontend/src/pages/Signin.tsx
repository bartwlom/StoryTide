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
                    <div className="flex flex-row justify-center items-center gap-3">
                        <img src="/storytide logo.svg" alt="StoryTide Logo" className="w-8 h-8 object-contain" />
                        <span className="font-mono text-xl font-bold text-terminal-green terminal-glow tracking-wider">
                            STORYTIDE
                        </span>
                    </div>
                    <div className="flex gap-6 text-terminal-green-dim">
                        <span>MEM_UTIL: [629K/640K]</span>
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
                    <Auth type={"signin"} />

                    {/* Demo Credentials Box */}
                    <div className="px-6 mt-4">
                        <div className="terminal-box w-full max-w-md p-5 border border-terminal-green">
                            <div className="font-mono">
                                <div className="text-terminal-green text-sm font-bold mb-3 terminal-glow">
                                    &gt;_ DEMO_CREDENTIALS
                                </div>
                                <div className="text-terminal-green-dim text-xs mb-2">
                                    Use these credentials to explore the platform:
                                </div>
                                <div className="bg-terminal-card-bg/30 p-3 rounded border border-terminal-border">
                                    <div className="text-terminal-green text-xs">
                                        <span className="text-terminal-green-dark">Email:</span> demo@storytide.com
                                    </div>
                                    <div className="text-terminal-green text-xs mt-1">
                                        <span className="text-terminal-green-dark">Password:</span> 123
                                    </div>
                                </div>
                                <div className="text-terminal-green-dark text-xs mt-3">
                                    &gt; Sign up to create your own blogs!
                                </div>
                            </div>
                        </div>
                    </div>
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
