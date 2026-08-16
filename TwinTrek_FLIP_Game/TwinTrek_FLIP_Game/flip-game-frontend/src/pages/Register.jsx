import { useState } from "react";
import { api, setToken } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "", email: "", avatar: "🦄" });
    const [loading, setLoading] = useState(false);
    const avatars = ["🦄", "🐍", "🦋", "🚀", "🌙", "⭐", "🔥", "💎"];

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await api.post("/api/auth/register", form);
            setToken(data.token);
            localStorage.setItem("playerId", data.playerId);
            localStorage.setItem("username", data.username);
            localStorage.setItem("avatar", data.avatar);
            navigate("/profile");
        } catch (err) {
            alert("Registration failed. Username or email might be taken.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 w-full relative z-10 overflow-hidden text-white font-sans">
            <div className="w-full max-w-[420px] bg-white/5 backdrop-blur-md border border-cyan-400/30 p-8 sm:p-12 rounded-[2rem] shadow-[0_0_40px_rgba(34,211,238,0.15)] relative z-10 flex flex-col items-center">
                
                <h2 className="text-4xl font-light mb-4 text-white tracking-[0.3em] font-[Orbitron] uppercase">TWIN<span className="font-bold">TREK</span></h2>
                <p className="text-white/90 text-xl mb-8 font-light tracking-wide">Join the Galaxy</p>
                
                <form onSubmit={submit} className="w-full flex flex-col gap-4">
                    
                    {/* Avatar Selection */}
                    <div className="flex flex-col gap-2 mb-2 items-center">
                        <label className="text-center text-white/90 text-sm font-light tracking-wide mb-2">Select Avatar</label>
                        <div className="flex flex-wrap justify-center gap-3">
                            {avatars.map((a) => (
                                <button
                                    key={a}
                                    type="button"
                                    onClick={() => setForm({ ...form, avatar: a })}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                                        form.avatar === a 
                                            ? 'bg-cyan-500/30 border border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] scale-110' 
                                            : 'bg-transparent border border-white/20 hover:border-white/50 opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-left text-white/90 text-sm font-light tracking-wide">Username</label>
                        <input
                            type="text"
                            className="w-full bg-transparent border border-cyan-400/50 text-white placeholder-white/40 text-base px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
                            placeholder="CaptainTrek"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-left text-white/90 text-sm font-light tracking-wide">Email address</label>
                        <input
                            type="email"
                            className="w-full bg-transparent border border-cyan-400/50 text-white placeholder-white/40 text-base px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
                            placeholder="example@gmail.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                        <label className="text-left text-white/90 text-sm font-light tracking-wide">Password</label>
                        <input
                            type="password"
                            className="w-full bg-transparent border border-cyan-400/50 text-white placeholder-white/40 text-base px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all tracking-widest"
                            placeholder="••••••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex flex-col items-center mt-2 w-full">
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-xl text-white text-lg font-medium tracking-wider shadow-[0_4px_15px_rgba(34,211,238,0.3)] hover:shadow-[0_4px_25px_rgba(34,211,238,0.5)] active:scale-95 transition-all"
                            disabled={loading}
                        >
                            {loading ? "..." : "Sign Up"}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-sm text-white/80 font-light flex items-center justify-center gap-1">
                    Already have an account?{" "}
                    <button type="button" onClick={() => navigate("/login")} className="text-white font-bold hover:text-cyan-300 transition-colors tracking-wide">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
