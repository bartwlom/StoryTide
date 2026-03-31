import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [publishing, setPublishing] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [editorHeight, setEditorHeight] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
        }
    }, [navigate]);

    useEffect(() => {
        const calculateHeight = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const availableHeight = viewportHeight - containerRect.top;
                // Subtract header (32px), title area (~80px), separator (16px), bottom bar (32px), borders
                const editorH = Math.max(200, availableHeight - 160);
                setEditorHeight(editorH);
            }
        };

        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        return () => window.removeEventListener('resize', calculateHeight);
    }, []);

    return <div className="min-h-screen bg-terminal-bg flex flex-col">
        <Appbar />
        <div ref={containerRef} className="flex-1 flex flex-col px-4 pb-4">
            <div className="flex-1 w-full font-mono flex flex-col">
                {/* Nano Editor Container - Full height */}
                <div className="flex-1 border border-terminal-border bg-terminal-bg flex flex-col">
                    {/* Nano Header Bar - Muted dark green */}
                    <div className="bg-terminal-green-header text-terminal-green px-4 py-1 flex justify-between items-center text-sm font-bold border-b border-terminal-border">
                        <span>GNU NANO 6.2</span>
                        <span>NEW BUFFER</span>
                        <span>{title || description ? "MODIFIED" : ""}</span>
                    </div>
                    
                    {/* Title Input - Nano style with better contrast */}
                    <div className="px-4 pt-4 pb-2">
                        <input 
                            onChange={(e) => setTitle(e.target.value)} 
                            type="text" 
                            className="w-full bg-terminal-bg text-terminal-green font-mono text-lg border-0 border-b border-terminal-green-dark outline-none focus:border-terminal-green placeholder-terminal-green-dark/50 pb-1" 
                            placeholder="# ENTER_DOCUMENT_TITLE..." 
                            value={title}
                        />
                    </div>
                    
                    {/* Text Editor Area - Fills remaining space */}
                    <div className="flex-1 px-4 min-h-0">
                        <textarea 
                            onChange={(e) => setDescription(e.target.value)} 
                            id="editor" 
                            style={{ height: editorHeight > 0 ? `${editorHeight}px` : '100%' }}
                            className="focus:outline-none block w-full h-full px-0 text-sm text-terminal-green bg-terminal-bg border-0 font-mono resize-none placeholder-terminal-green-dark/50" 
                            placeholder="# Enter your system log content here..." 
                            value={description}
                        />
                    </div>
                    
                    {/* Nano Bottom Bar - Muted dark green */}
                    <div className="bg-terminal-green-header text-terminal-green px-2 py-1 flex flex-wrap justify-between items-center text-xs border-t border-terminal-border">
                        <button 
                            onClick={() => alert("Help: Enter title and content, then press Ctrl+O to publish")}
                            className="hover:text-white cursor-pointer transition-colors"
                        >
                            ^G Get Help
                        </button>
                        <button 
                            onClick={async () => {
                                if (!title || !description) {
                                    alert("Please fill in both title and content");
                                    return;
                                }
                                try {
                                    setPublishing(true);
                                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                        title,
                                        content: description
                                    }, {
                                        headers: {
                                            Authorization: localStorage.getItem("token")
                                        }
                                    });
                                    navigate(`/blog/${response.data.id}`)
                                } catch (e: any) {
                                    if (e?.response?.status === 403) {
                                        alert("You are not logged in. Redirecting to sign in...");
                                        navigate("/signin");
                                    } else {
                                        alert("Failed to publish post. Please try again.");
                                    }
                                } finally {
                                    setPublishing(false);
                                }
                            }}
                            disabled={publishing}
                            className="hover:text-white cursor-pointer disabled:opacity-50 transition-colors"
                        >
                            {publishing ? "Writing..." : "^O WriteOut (Publish)"}
                        </button>
                        <span className="opacity-70">^R Read File</span>
                        <span className="opacity-70">^W Where Is</span>
                        <button 
                            onClick={() => navigate('/blogs')}
                            className="hover:text-white cursor-pointer transition-colors"
                        >
                            ^X Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
