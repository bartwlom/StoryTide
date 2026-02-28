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

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", "Bearer " + jwt);
            navigate("/blogs");
        } catch {
            alert("Error while authenticating. SYSTEM HALT.")
        }
    }

    return <div className="flex justify-center flex-col h-full mt-12 md:mt-24 w-full max-w-lg mx-auto p-6 border-glow bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col gap-6">
            <div>
<<<<<<< HEAD
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
=======
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        {type === "signup" ? "Create an account" : "Sign in to your account"}
                    </div>
                    <div className="text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Amit Bartwal..." onChange={(e) => {
>>>>>>> 405a905d4844de5084c05985b84959c94dd2a835
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
<<<<<<< HEAD
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
=======
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="amit@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="******" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
>>>>>>> 405a905d4844de5084c05985b84959c94dd2a835
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