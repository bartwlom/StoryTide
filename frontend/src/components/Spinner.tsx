export const Spinner = () => {
    return <div className="flex justify-center items-center h-screen bg-terminal-bg">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terminal-green"></div>
            <span className="font-mono text-terminal-green-dim text-sm animate-pulse">
                LOADING_SYSTEM_DATA<span className="blink-cursor"></span>
            </span>
        </div>
    </div>
}

export default Spinner;             