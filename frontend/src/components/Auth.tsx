import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { signupInputType } from "@medium-blogging/common-app";
import { apiClient } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInputType>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await apiClient.post(`/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            localStorage.setItem("token", response.data.jwt);
            navigate("/blogs");
        } catch {
            alert("Error while authenticating. SYSTEM HALT.")
        }
    }

    return <div className="flex justify-center flex-col h-full mt-12 md:mt-24 w-full max-w-lg mx-auto p-6 border-glow bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col gap-6">
            <div>
                <div className="text-2xl md:text-3xl font-bold text-glow mb-2 uppercase">
                    {type === "signup" ? "Initialize_User" : "Authenticate_Session"}
                </div>
                <div className="text-term-fg opacity-80 text-sm">
                    {type === "signin" ? "> NO_ACCOUNT_DETECTED?" : "> ACCOUNT_EXISTS?"}
                    <Link className="ml-4 hover:text-white hover:bg-term-fg px-1 transition-colors" to={type === "signin" ? "/signup" : "/signin"}>
                        {type === "signin" ? "[ ./run_signup.sh ]" : "[ ./run_signin.sh ]"}
                    </Link>
                </div>
            </div>

            <div className="pt-8 flex flex-col gap-4">
                {type === "signup" && (
                    <LabelledInput label="enter_name" placeholder="Harkirat Singh" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />
                )}
                <LabelledInput label="enter_email" placeholder="harkirat@gmail.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} />
                <LabelledInput label="enter_password" type="password" placeholder="******" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />

                <button
                    onClick={sendRequest}
                    type="button"
                    className="mt-8 w-full border border-term-fg text-term-fg hover:bg-term-fg hover:text-term-bg focus:outline-none font-bold uppercase py-3 transition-colors duration-150 flex justify-center items-center gap-2 group"
                >
                    <span className="opacity-50 group-hover:opacity-100">[</span>
                    {type === "signup" ? "./EXECUTE_SIGNUP.sh" : "./EXECUTE_LOGIN.sh"}
                    <span className="opacity-50 group-hover:opacity-100">]</span>
                </button>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2 text-sm sm:text-base">
        <label className="text-term-fg opacity-90 whitespace-nowrap min-w-[140px] flex items-center gap-2">
            <span className="text-term-glow opacity-50">&gt;</span> {label}:
        </label>
        <div className="flex-grow flex items-center text-term-fg">
            <span>[</span>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-transparent border-none outline-none focus:ring-0 text-term-glow placeholder-term-fg/30 flex-grow px-2 font-mono w-full"
                placeholder={placeholder}
                required
            />
            <span>]</span>
        </div>
    </div>
}