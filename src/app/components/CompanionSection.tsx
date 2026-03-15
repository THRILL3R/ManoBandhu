import { useState } from "react";

const dogNames = [
    "Max", "Bella", "Luna", "Charlie", "Cooper",
    "Daisy", "Rocky", "Bailey", "Buddy", "Lucy"
];

const dogTraits = [
    { emoji: "🌅", trait: "Greets you every morning on The Garden" },
    { emoji: "🔦", trait: "Sits quietly beside you at The Lighthouse" },
    { emoji: "🪨", trait: "Curls up with you in The Cave" },
    { emoji: "🎡", trait: "Runs ahead of you at The Fair" },
    { emoji: "💎", trait: "Nudges the Treasure Box open each evening" },
    { emoji: "🏠", trait: "Guards your memories at Home" },
];

export function CompanionSection() {
    const [chosenName, setChosenName] = useState("");
    const [customName, setCustomName] = useState("");
    const [revealed, setRevealed] = useState(false);

    const finalName = customName || chosenName;

    return (
        <section
            className="relative py-24 px-6 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #fef6ec 0%, #fdf2f8 100%)" }}
        >
            {/* Background decoration */}
            <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.07] pointer-events-none"
                style={{ background: "radial-gradient(circle, #f39c12, transparent)", transform: "translate(30%, -30%)" }}
            />
            <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.07] pointer-events-none"
                style={{ background: "radial-gradient(circle, #e91e8c, transparent)", transform: "translate(-30%, 30%)" }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Dog visual + art */}
                    <div className="flex flex-col items-center">
                        {/* Dog illustration area */}
                        <div
                            className="relative w-72 h-72 rounded-full flex items-center justify-center mb-6"
                            style={{
                                background: "linear-gradient(135deg, #fde68a, #fca5a5, #c4b5fd)",
                                boxShadow: "0 20px 60px rgba(243,156,18,0.25)",
                            }}
                        >
                            {/* Dog photo */}
                            <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1761033105562-050495a3721c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                                    alt="Your island companion"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating paw badge */}
                            <div
                                className="absolute -top-2 -right-2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                                style={{ background: "white", fontSize: "1.8rem" }}
                            >
                                🐾
                            </div>

                            {/* Name badge */}
                            {finalName && revealed && (
                                <div
                                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full shadow-lg"
                                    style={{
                                        background: "linear-gradient(135deg, #2d9e7e, #1a6b5a)",
                                        color: "white",
                                        fontFamily: "'Playfair Display', serif",
                                        fontWeight: 700,
                                        fontSize: "1rem",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {finalName} 🐕
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div>
                        <span
                            className="inline-block px-4 py-1.5 rounded-full mb-4"
                            style={{
                                background: "rgba(243,156,18,0.12)",
                                color: "#b45309",
                                fontFamily: "'Nunito', sans-serif",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                            }}
                        >
                            YOUR ISLAND COMPANION
                        </span>

                        <h2
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "#2c1810",
                                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                                fontWeight: 700,
                                lineHeight: 1.3,
                                marginBottom: "1rem",
                            }}
                        >
                            You Won't Be Exploring
                            <span
                                style={{
                                    display: "block",
                                    fontStyle: "italic",
                                    color: "#d97706",
                                }}
                            >
                                Alone
                            </span>
                        </h2>

                        <p
                            style={{
                                fontFamily: "'Nunito', sans-serif",
                                color: "#5a3e28",
                                fontSize: "1.05rem",
                                lineHeight: 1.8,
                                marginBottom: "1rem",
                            }}
                        >
                            From the moment you arrive on your island, a dog joins you. Your companion. Always there, never judging — tail wagging as you open your diary, padding softly beside you at the lighthouse, nudging you gently toward the treasure box each evening.
                        </p>
                        <p
                            style={{
                                fontFamily: "'Nunito', sans-serif",
                                color: "#5a3e28",
                                fontSize: "1.05rem",
                                lineHeight: 1.8,
                                marginBottom: "2rem",
                            }}
                        >
                            You get to choose your companion's name — something that feels just right. Something that, when you see it pop up on screen, makes you feel a little less alone.
                        </p>

                    </div>
                </div>

                {/* Name chooser moved below the grid */}
                <div
                    className="rounded-3xl p-8 mt-16 w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8"
                    style={{
                        background: "white",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                        border: "1px solid rgba(243,156,18,0.2)",
                    }}
                >
                    <div className="flex-1 w-full">
                        <p
                            className="mb-4 text-center md:text-left"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "#2c1810",
                                fontSize: "1.15rem",
                                fontWeight: 600,
                            }}
                        >
                            What would you name your companion?
                        </p>

                        {/* Suggested names */}
                        <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                            {dogNames.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => { setChosenName(name); setCustomName(""); setRevealed(false); }}
                                    className="px-4 py-1.5 rounded-full transition-all duration-200 hover:scale-105 inline-block"
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        background: chosenName === name && !customName ? "#2d9e7e" : "#f0faf7",
                                        color: chosenName === name && !customName ? "white" : "#2d6a4f",
                                        border: `1px solid ${chosenName === name && !customName ? "#2d9e7e" : "rgba(45,158,126,0.25)"}`,
                                    }}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-80 flex-shrink-0 flex flex-col items-center md:items-stretch">
                        <div className="flex items-center gap-2 mb-3 w-full">
                            <div className="h-px flex-1" style={{ background: "rgba(0,0,0,0.08)" }} />
                            <span style={{ fontFamily: "'Nunito', sans-serif", color: "#9ca3af", fontSize: "0.85rem" }}>or type your own</span>
                            <div className="h-px flex-1" style={{ background: "rgba(0,0,0,0.08)" }} />
                        </div>

                        <div className="flex gap-3 w-full">
                            <input
                                type="text"
                                placeholder="Enter a name..."
                                value={customName}
                                maxLength={20}
                                onChange={(e) => { setCustomName(e.target.value); setChosenName(""); setRevealed(false); }}
                                className="flex-1 w-full min-w-0 px-4 py-2.5 rounded-xl outline-none"
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    fontSize: "0.95rem",
                                    background: "#f9fafb",
                                    border: "1.5px solid rgba(45,158,126,0.3)",
                                    color: "#1a3a2a",
                                }}
                            />
                            <button
                                onClick={() => { if (finalName) setRevealed(true); }}
                                disabled={!finalName}
                                className="px-6 py-2.5 rounded-xl font-bold transition-all duration-200 hover:scale-105 disabled:opacity-40 whitespace-nowrap"
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    fontSize: "0.95rem",
                                    background: "linear-gradient(135deg, #2d9e7e, #1a6b5a)",
                                    color: "white",
                                    boxShadow: finalName ? "0 4px 14px rgba(45,158,126,0.35)" : "none",
                                }}
                            >
                                Meet them!
                            </button>
                        </div>
                    </div>

                </div>
                {/* Revealed state below the horizontal banner */}
                {revealed && finalName && (
                    <div
                        className="mt-6 p-5 rounded-xl text-center max-w-3xl mx-auto w-full"
                        style={{ background: "linear-gradient(135deg, #e8f7f2, #d5f5e3)" }}
                    >
                        <p
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "#0d4d3a",
                                fontSize: "1.2rem",
                                fontStyle: "italic",
                            }}
                        >
                            🐾 Say hello to <strong>{finalName}</strong> — your companion on this island. They'll be waiting for you every single day.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
