import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);
    const navigate = useNavigate();

    const handlePublish = async () => {
        if (!title || !description) {
            alert("SYSTEM ERROR: Cannot write empty file to disk.");
            return;
        }
        setIsPublishing(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            alert("SYSTEM ERROR: Failed to write file.");
            setIsPublishing(false);
        }
    };

    return <div className="min-h-screen flex flex-col pt-4 pb-12">
        <Appbar />

        <div className="flex-grow flex flex-col justify-start items-center w-full px-4 max-w-5xl mx-auto">

            {/* Editor Top Bar (Nano Style) */}
            <div className="w-full bg-term-fg text-term-bg font-bold py-1 px-4 flex justify-between uppercase text-xs sm:text-sm">
                <span>GNU nano 6.2</span>
                <span>New Buffer</span>
                <span>Modified</span>
            </div>

            <div className="w-full flex flex-col border border-term-fg border-t-0 p-4 bg-term-bg/50 min-h-[60vh]">

                {/* Title Input */}
                <div className="flex items-center gap-2 mb-6 text-xl border-b border-term-fg/30 pb-2">
                    <span className="opacity-50"># </span>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-transparent border-none outline-none focus:ring-0 text-term-glow placeholder-term-fg/30 font-bold"
                        placeholder="ENTER_DOCUMENT_TITLE..."
                    />
                </div>

                {/* Content Area */}
                <TextEditor onChange={(e) => setDescription(e.target.value)} />

            </div>

        </div>

        {/* Editor Bottom Command Strip */}
        <div className="fixed bottom-0 left-0 w-full bg-term-bg border-t border-term-fg z-50 p-2 text-xs md:text-sm">
            <div className="max-w-5xl mx-auto flex flex-wrap gap-x-6 gap-y-2 justify-between">
                <div className="flex gap-4 sm:gap-6 flex-wrap">
                    <button className="flex gap-2 items-center opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed">
                        <span className="bg-term-fg text-term-bg px-1 font-bold">^G</span>
                        <span>Get Help</span>
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="flex gap-2 items-center hover:text-white hover:bg-term-fg px-2 transition-colors cursor-pointer"
                    >
                        <span className="bg-term-fg text-term-bg px-1 font-bold">^O</span>
                        <span>{isPublishing ? "WRITING..." : "WriteOut (Publish)"}</span>
                    </button>
                    <button className="flex gap-2 items-center opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed">
                        <span className="bg-term-fg text-term-bg px-1 font-bold">^R</span>
                        <span>Read File</span>
                    </button>
                    <button className="flex gap-2 items-center opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed">
                        <span className="bg-term-fg text-term-bg px-1 font-bold">^W</span>
                        <span>Where Is</span>
                    </button>
                    <button onClick={() => navigate('/blogs')} className="flex gap-2 items-center hover:text-white hover:bg-term-fg px-2 transition-colors cursor-pointer">
                        <span className="bg-term-fg text-term-bg px-1 font-bold">^X</span>
                        <span>Exit</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="flex-grow w-full h-full min-h-[40vh]">
        <textarea
            onChange={onChange}
            className="w-full h-full min-h-[40vh] bg-transparent border-none outline-none focus:ring-0 text-term-fg resize-none placeholder-term-fg/20 leading-relaxed font-mono custom-scrollbar"
            placeholder="Type your content here. HTML/Markdown syntax accepted in standard systems, but here just raw text..."
            required
        />
    </div>
}
