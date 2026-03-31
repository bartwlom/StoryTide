export const Quote = () => {
    return (
        <div className="p-8">
            <div className="terminal-box w-full max-w-md p-6 relative">
                <div className="absolute top-0 right-0 bg-terminal-green text-terminal-bg px-2 py-1 text-xs font-mono">
                    /etc/motd
                </div>
                <div className="mt-4 font-mono">
                    <div className="text-terminal-green mb-4">
                        $ cat ./quote_of_the_day.txt
                    </div>
                    <div className="text-terminal-green text-lg leading-relaxed mb-2">
                        "The only way to do great work is to love what you do. If you don't find what you love keep looking and don't settle. As with all matters of the heart, you'll know when you find it."
                    </div>
                    <div className="text-terminal-green text-lg mb-4">
                        "stay hungry stay foolish"
                    </div>
                    <div className="text-terminal-green-dim text-sm">
                        &gt;&gt; AUTHOR: Steve Jobs
                    </div>
                </div>
            </div>
        </div>
    );
}
