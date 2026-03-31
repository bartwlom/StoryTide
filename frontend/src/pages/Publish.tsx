import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [publishing, setPublishing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
        }
    }, [navigate]);

    return <div className="min-h-screen bg-terminal-bg">
        <Appbar />
        <div className="flex justify-center w-full pt-8 px-4">
            <div className="max-w-5xl w-full font-mono">
                {/* Nano Editor Container */}
                <div className="border border-terminal-border bg-terminal-bg">
                    {/* Nano Header Bar */}
                    <div className="bg-terminal-green text-terminal-bg px-4 py-1 flex justify-between items-center text-sm font-bold">
                        <span>GNU NANO 6.2</span>
                        <span>NEW BUFFER</span>
                        <span>{title || description ? "MODIFIED" : ""}</span>
                    </div>
                    
                    {/* Title Input - Nano style */}
                    <div className="px-4 pt-4">
                        <input 
                            onChange={(e) => setTitle(e.target.value)} 
                            type="text" 
                            className="w-full bg-terminal-bg text-terminal-green font-mono text-lg border-none outline-none placeholder-terminal-green-dark" 
                            placeholder="# ENTER_DOCUMENT_TITLE..." 
                            value={title}
                        />
                    </div>
                    
                    {/* Separator line */}
                    <div className="border-b border-terminal-border/30 mx-4 my-2"></div>
                    
                    {/* Text Editor Area */}
                    <TextEditor 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                    
                    {/* Nano Bottom Bar */}
                    <div className="bg-terminal-green text-terminal-bg px-2 py-1 flex flex-wrap justify-between items-center text-xs">
                        <button 
                            onClick={() => alert("Help: Enter title and content, then press Ctrl+O to publish")}
                            className="hover:underline cursor-pointer"
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
                            className="hover:underline cursor-pointer disabled:opacity-50"
                        >
                            {publishing ? "Writing..." : "^O WriteOut (Publish)"}
                        </button>
                        <span>^R Read File</span>
                        <span>^W Where Is</span>
                        <button 
                            onClick={() => navigate('/blogs')}
                            className="hover:underline cursor-pointer"
                        >
                            ^X Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function TextEditor({ value, onChange }: { value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="px-4 pb-2">
        <textarea 
            onChange={onChange} 
            id="editor" 
            rows={20} 
            className="focus:outline-none block w-full px-0 text-sm text-terminal-green bg-terminal-bg border-0 font-mono resize-none placeholder-terminal-green-dark" 
            placeholder="# Enter your system log content here..." 
            value={value}
            required 
        />
    </div>
}
