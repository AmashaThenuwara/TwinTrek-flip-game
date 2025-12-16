import { useState } from "react";
import { api, setToken } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await api.post("/api/auth/login", form);
            setToken(data.token); // ✅ store token in client.js
            localStorage.setItem("playerId", data.playerId);
            localStorage.setItem("username", data.username);
            navigate("/profile");
        } catch (err) {
            alert("Login failed. Please check your username and password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-black text-white">
            <form onSubmit={submit} className="bg-black/40 p-6 rounded w-80">
                <h2 className="text-2xl mb-4">Sign in</h2>
                <div className="space-y-3">
                    <input
                        className="w-full p-2 rounded bg-slate-800"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                    <input
                        type="password"
                        className="w-full p-2 rounded bg-slate-800"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button type="button" className="text-sm underline" onClick={() => navigate("/register")}>
                        Create account
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 px-3 py-1 rounded"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </div>
            </form>
        </div>
    );
}
