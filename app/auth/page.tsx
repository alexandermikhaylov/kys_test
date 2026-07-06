"use client";

import { FormEvent, useState } from "react";

export default function AuthPage() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const res = await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({
                login: name,
                password: password
            })
        })
        console.log(res.body)
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="login" onChange={(e) => setName(e.target.value)} />
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            </main>
        </div>
    )
}