export const Quote = () => {
    return <div className="h-full flex flex-col justify-center px-8 md:px-16 w-full max-w-2xl text-term-fg">
        <div className="border border-term-fg p-6 bg-term-bg/80 relative">
            <div className="absolute top-0 right-0 bg-term-fg text-term-bg px-2 font-bold text-sm">
                /etc/motd
            </div>

            <div className="mb-4 text-glow mt-2">
                $ cat ./quote_of_the_day.txt
            </div>

            <div className="text-lg md:text-xl font-mono leading-relaxed opacity-90 mb-6 pl-4 border-l-2 border-term-fg/50">
                "The only way to do great work is to love what you do. If you don't find what you love keep looking and settle as with all matters of heart you'll know when you find it."
                <br /><br />
                "stay hungry stay foolish"
            </div>

            <div className="text-sm opacity-60 flex gap-2 items-center">
                <span>&gt;&gt; AUTHOR:</span>
                <span className="text-term-glow font-bold">Steve Jobs</span>
            </div>
        </div>
    </div>
}
