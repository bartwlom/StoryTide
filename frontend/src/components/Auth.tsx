import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { signupInputType } from "@medium-blogging/common-app";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInputType>({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function sendRequest() {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch {
            setError("Authentication failed. Check credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-full flex items-center justify-center p-6">
            <div className="terminal-box w-full max-w-md p-6">
                <div className="mb-5">
                    <h1 className="text-2xl font-bold text-terminal-green terminal-glow tracking-wider">
                        {type === "signup" ? "INITIALIZE_USER" : "AUTHENTICATE_SESSION"}
                    </h1>
                    <div className="text-terminal-green-dim text-sm mt-2 font-mono">
                        <span className="text-terminal-green">&gt;</span> {type === "signup" ? "ACCOUNT_EXISTS?" : "NO_ACCOUNT_DETECTED?"} 
                        <Link className="ml-2 text-terminal-green hover:terminal-glow transition-all" to={type === "signin" ? "/signup" : "/signin"}>
                            [ {type === "signin" ? "./run_signup.sh" : "./run_signin.sh"} ]
                        </Link>
                    </div>
                </div>
                <div className="space-y-4">
                    {type === "signup" ? (
                        <LabelledInput 
                            label="enter_name" 
                            placeholder="Harkirat Singh" 
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value
                                })
                            }} 
                        />
                    ) : null}
                    <LabelledInput 
                        label="enter_email" 
                        placeholder="harkirat@gmail.com" 
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} 
                    />
                    <LabelledInput 
                        label="enter_password" 
                        type="password" 
                        placeholder="******" 
                        onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} 
                    />
                    <button 
                        onClick={sendRequest} 
                        type="button" 
                        disabled={loading}
                        className="mt-5 w-full border border-terminal-green text-terminal-green bg-terminal-input-bg hover:bg-terminal-green hover:text-terminal-bg font-mono text-sm py-3 px-4 transition-all duration-200 terminal-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "EXECUTING..." : `[ ${type === "signup" ? "./EXECUTE_SIGNUP.SH" : "./EXECUTE_LOGIN.SH"} ]`}
                    </button>
                    {error && (
                        <div className="font-mono text-sm text-orange-500 mt-3">
                            &gt; ERROR: {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="font-mono">
            <label className="block text-terminal-green text-sm mb-1">
                <span className="text-terminal-green">&gt;</span> {label}:
            </label>
            <div className="flex items-center">
                <span className="text-terminal-green mr-1">[</span>
                <input 
                    onChange={onChange} 
                    type={type || "text"} 
                    className="flex-1 bg-transparent text-terminal-green text-sm py-1 outline-none placeholder-terminal-green-dark" 
                    placeholder={placeholder} 
                    required 
                />
                <span className="text-terminal-green ml-1">]</span>
            </div>
        </div>
    );
}
