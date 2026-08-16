import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

const AVATARS = ['🦄','🐉','🦋','🚀','🌙','⭐','🔥','💎'];

export default function Profile() {
    const navigate = useNavigate();
    const authedPlayerId = Number(localStorage.getItem("playerId")) || null;
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState({ displayName: "", avatar: "" });

    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    useEffect(() => {
        if (!authedPlayerId) { 
            navigate("/login"); 
            return; 
        }
        api.get(`/api/profile/${authedPlayerId}`)
            .then((d) => { 
                setProfile(d);
                setEditForm({ displayName: d.name, avatar: d.avatar || '🦄' });
                setLoading(false); 
            })
            .catch(() => {
                navigate("/login");
            });
    }, [authedPlayerId, navigate]);

    const saveProfile = async () => {
        try {
            const d = await api.put(`/api/profile/${authedPlayerId}`, editForm);
            setProfile(d);
            localStorage.setItem("avatar", d.avatar);
            setEditMode(false);
        } catch (e) {
            alert("Failed to update profile.");
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/profile/${authedPlayerId}/password`, passwordForm);
            alert("Password updated successfully!");
            setShowPasswordChange(false);
            setPasswordForm({ currentPassword: "", newPassword: "" });
        } catch (e) {
            alert("Failed to change password. Check your current password.");
        }
    };

    const remove = async () => {
        const ok = confirm("Delete your profile? This will sign you out and delete your data permanently.");
        if (!ok) return;
        await api.del(`/api/players/${authedPlayerId}`);
        localStorage.removeItem("playerId");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        api.setToken(null);
        navigate("/login");
    };

    const logout = () => {
        localStorage.removeItem("playerId");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        api.setToken(null);
        navigate("/login");
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading profile...</div>;

    const winRate = profile.totalGames > 0 ? Math.round((profile.wins / profile.totalGames) * 100) : 0;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 w-full relative z-10 overflow-hidden text-white font-sans">
            {/* Top Left Back Button */}
            <button 
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 z-50 w-12 h-12 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-200 hover:bg-purple-500/20 hover:text-white transition-colors backdrop-blur-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            <div className="w-full max-w-[800px] bg-[#0f0b1a]/80 backdrop-blur-xl border border-purple-500/20 p-8 sm:p-10 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 flex flex-col">
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Left Column: Avatar & Edit */}
                    <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
                        <div className="w-32 h-32 bg-[#1f1636] rounded-[32px] flex items-center justify-center shadow-inner border border-purple-500/10 text-6xl shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                            {editMode ? editForm.avatar : (profile.avatar || '🦄')}
                        </div>
                        
                        {editMode ? (
                            <div className="flex flex-col gap-3 w-full">
                                <input
                                    className="w-full py-3 px-4 rounded-xl bg-[#1a132b]/80 border border-purple-500/20 text-white focus:outline-none focus:ring-1 focus:ring-purple-400 text-center font-bold"
                                    value={editForm.displayName}
                                    onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                                    placeholder="Display Name"
                                />
                                <div className="flex flex-wrap gap-2 justify-center bg-[#1a132b]/80 border border-purple-500/20 p-2 rounded-xl shadow-inner">
                                    {AVATARS.map(av => (
                                        <button
                                            key={av}
                                            onClick={() => setEditForm({ ...editForm, avatar: av })}
                                            className={`w-10 h-10 text-2xl flex items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-110 ${
                                                editForm.avatar === av 
                                                    ? 'bg-purple-600/50 border border-pink-400 scale-110 shadow-[0_0_15px_rgba(236,72,153,0.5)]' 
                                                    : 'bg-transparent border border-purple-500/20 hover:bg-purple-800/50'
                                            }`}
                                        >
                                            {av}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={saveProfile} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2 rounded-lg hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] transition-all active:scale-95 btn-shiny">Save</button>
                                    <button onClick={() => { setEditMode(false); setEditForm({ displayName: profile.name, avatar: profile.avatar || '🦄' }); }} className="flex-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 py-2 rounded-lg font-bold hover:bg-gray-500/30 transition">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-1 w-full">
                                <h2 className="text-2xl font-black text-white truncate w-full text-center">{profile.name}</h2>
                                <p className="text-purple-300/60 text-sm font-medium">@{profile.username}</p>
                                <button onClick={() => setEditMode(true)} className="mt-3 w-full bg-purple-500/20 text-purple-300 border border-purple-500/30 py-2 rounded-xl font-bold hover:bg-purple-500/30 transition-colors shadow-inner">Edit Profile</button>
                            </div>
                        )}
                        
                        <div className="w-full h-[1px] bg-purple-500/20 my-2"></div>
                        
                        <button onClick={() => setShowPasswordChange(!showPasswordChange)} className="w-full text-left text-sm text-purple-200/60 hover:text-purple-200 transition-colors py-2 px-3 rounded-lg hover:bg-white/5">Change Password</button>
                        <button onClick={logout} className="w-full text-left text-sm text-yellow-400/80 hover:text-yellow-400 transition-colors py-2 px-3 rounded-lg hover:bg-white/5">Log Out</button>
                        <button onClick={remove} className="w-full text-left text-sm text-red-400/80 hover:text-red-400 transition-colors py-2 px-3 rounded-lg hover:bg-white/5">Delete Account</button>
                    </div>

                    {/* Right Column: Stats */}
                    <div className="flex-1 flex flex-col gap-6 w-full">
                        
                        {/* Password Change Modal / Inline */}
                        {showPasswordChange && (
                            <form onSubmit={changePassword} className="bg-[#1a132b]/80 p-5 rounded-2xl border border-purple-500/20 flex flex-col gap-3 mb-2 shadow-inner">
                                <h3 className="text-sm font-bold text-purple-100 uppercase tracking-wider">Change Password</h3>
                                <input type="password" placeholder="Current Password" required value={passwordForm.currentPassword} onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})} className="w-full py-2 px-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm" />
                                <input type="password" placeholder="New Password" required value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="w-full py-2 px-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm" />
                                <div className="flex gap-2 mt-1">
                                    <button type="submit" className="flex-1 bg-pink-500/20 text-pink-400 border border-pink-500/30 py-2 rounded-lg font-bold text-sm hover:bg-pink-500/30 transition">Update</button>
                                    <button type="button" onClick={() => setShowPasswordChange(false)} className="px-4 bg-gray-500/20 text-gray-400 border border-gray-500/30 py-2 rounded-lg font-bold text-sm hover:bg-gray-500/30 transition">Cancel</button>
                                </div>
                            </form>
                        )}

                        <div>
                            <h3 className="text-xs font-black text-purple-300/80 uppercase tracking-widest mb-3">Career Stats</h3>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-purple-900/30 border border-purple-500/20 p-4 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                                    <span className="text-xl sm:text-2xl font-black text-white">{profile.totalGames}</span>
                                    <span className="text-[10px] text-purple-300 uppercase tracking-wider font-bold mt-1 text-center">Games</span>
                                </div>
                                <div className="bg-purple-900/30 border border-purple-500/20 p-4 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                                    <span className="text-xl sm:text-2xl font-black text-white">{winRate}%</span>
                                    <span className="text-[10px] text-purple-300 uppercase tracking-wider font-bold mt-1 text-center">Win Rate</span>
                                </div>
                                <div className="bg-purple-900/30 border border-purple-500/20 p-4 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                                    <span className="text-xl sm:text-2xl font-black text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]">{profile.bestCombo}</span>
                                    <span className="text-[10px] text-purple-300 uppercase tracking-wider font-bold mt-1 text-center">Best Streak</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-black text-purple-300/80 uppercase tracking-widest mb-3">Best Scores</h3>
                            <div className="bg-purple-900/20 border border-purple-500/20 rounded-2xl p-4 flex flex-col gap-3 shadow-inner">
                                <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl">
                                    <span className="text-sm font-bold text-green-400 tracking-wider uppercase">Easy</span>
                                    <span className="text-lg font-black text-white">{profile.bestScore || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl opacity-60">
                                    <span className="text-sm font-bold text-yellow-400 tracking-wider uppercase">Medium</span>
                                    <span className="text-lg font-black text-white">-</span>
                                </div>
                                <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl opacity-60">
                                    <span className="text-sm font-bold text-red-400 tracking-wider uppercase">Hard</span>
                                    <span className="text-lg font-black text-white">-</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
