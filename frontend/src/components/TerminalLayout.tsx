import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export const TerminalLayout = ({ children }: { children: React.ReactNode }) => {
    const [time, setTime] = useState(new Date());

    const [memUsage, setMemUsage] = useState("640K");

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        const memTimer = setInterval(() => {
            const base = 512;
            const flux = Math.floor(Math.random() * 128);
            setMemUsage(`${base + flux}K`);
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(memTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-term-bg text-term-fg font-mono relative crt-flicker">
            <div className="crt-overlay pointer-events-none"></div>

            <div className="flex flex-col min-h-screen max-w-5xl mx-auto p-4 md:p-8">

                <header className="border-b border-term-fg pb-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Terminal size={24} className="text-term-fg" />
                        <h1 className="text-xl md:text-2xl font-bold text-glow tracking-widest uppercase">
                            StoryTide<span className="animate-blink">_</span>
                        </h1>
                    </div>

                    <div className="flex gap-6 text-sm opacity-80">
                        <div className="hidden md:block">
                            <span className="opacity-50">MEM_UTIL:</span> [{memUsage}/640K]
                        </div>
                        <div>
                            <span className="opacity-50">SYS_TIME:</span> {time.toLocaleTimeString('en-US', { hour12: false })}
                        </div>
                    </div>
                </header>

                <main className="grow">
                    <div className="mb-4 text-sm opacity-70">
                        ~/storytide/root$ <span className="animate-blink block w-2 bg-term-fg h-4 align-middle ml-1"></span>
                    </div>

                    <div className="w-full">
                        {children}
                    </div>
                </main>

                <footer className="mt-12 border-t border-term-fg pt-4 text-xs opacity-50 flex justify-between">
                    <p>(c) 198X STORYTIDE SYSTEMS</p>
                    <p>SYSTEM.OK</p>
                </footer>

            </div>
        </div>
    );
};
