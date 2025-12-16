import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const authedPlayerId = Number(localStorage.getItem("playerId")) || null;
    const viewedPlayerId = Number(params.get("playerId")) || authedPlayerId; // open another player from leaderboard
    const [profile, setProfile] = useState({ id: viewedPlayerId, name: "", bestScore: 0, totalGames: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!viewedPlayerId) { setLoading(false); return; }
        api.get(`/api/players/${viewedPlayerId}`)
            .then((d) => { setProfile(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, [viewedPlayerId]);

    const save = async () => {
        const d = await api.put(`/api/players/${viewedPlayerId}`, {
            name: profile.name,
            bestScore: profile.bestScore,
            totalGames: profile.totalGames,
        });
        setProfile(d);
    };

    const remove = async () => {
        if (!authedPlayerId || authedPlayerId !== viewedPlayerId) {
            alert("You can only delete your own profile.");
            return;
        }
        const ok = confirm("Delete your profile? This will sign you out.");
        if (!ok) return;
        await api.del(`/api/players/${authedPlayerId}`);
        localStorage.removeItem("playerId");
        localStorage.removeItem("username");
        api.setToken(null);
        navigate("/login"); // back to sign-in flow
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading profile...</div>;
    if (!viewedPlayerId) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white">
                <p>No profile yet.</p>
                <div className="mt-4 space-x-2">
                    <button className="bg-blue-600 px-3 py-1 rounded" onClick={() => navigate("/register")}>Create profile</button>
                    <button className="bg-gray-600 px-3 py-1 rounded" onClick={() => navigate("/")}>Back to home</button>
                </div>
            </div>
        );
    }

    const isOwn = authedPlayerId === viewedPlayerId;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-black text-white">
            <div className="bg-black/40 p-6 rounded w-[28rem]">
                <h2 className="text-2xl mb-4">Player profile</h2>

                <div className="space-y-3">
                    <div className="text-sm text-gray-300">Player ID: {viewedPlayerId}</div>
                    <input
                        className="w-full p-2 rounded bg-slate-800"
                        placeholder="Display name"
                        value={profile.name || ""}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isOwn}
                    />
                    <input
                        type="number"
                        className="w-full p-2 rounded bg-slate-800"
                        placeholder="Best score"
                        value={profile.bestScore ?? 0}
                        onChange={(e) => setProfile({ ...profile, bestScore: Number(e.target.value) })}
                        disabled={!isOwn}
                    />
                    <input
                        type="number"
                        className="w-full p-2 rounded bg-slate-800"
                        placeholder="Total games"
                        value={profile.totalGames ?? 0}
                        onChange={(e) => setProfile({ ...profile, totalGames: Number(e.target.value) })}
                        disabled={!isOwn}
                    />
                </div>

                <div className="flex justify-between mt-4">
                    <div className="space-x-2">
                        {isOwn && <button className="bg-blue-600 px-3 py-1 rounded" onClick={save}>Save</button>}
                        {isOwn && <button className="bg-red-600 px-3 py-1 rounded" onClick={remove}>Delete profile</button>}
                    </div>
                    <div className="space-x-2">
                        <button className="bg-gray-600 px-3 py-1 rounded" onClick={() => navigate("/")}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
