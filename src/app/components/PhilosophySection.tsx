export function PhilosophySection() {
    return (
        <section
            id="about"
            className="relative py-24 px-6 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #f0faf7 0%, #e8f7f2 100%)" }}
        >


            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(46,204,113,0.12)",
                            color: "#1a7a50",
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                        }}
                    >
                        OUR PHILOSOPHY
                    </span>
                    <h2
                        className="max-w-2xl mx-auto"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#0d3d2e",
                            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                            fontWeight: 700,
                            lineHeight: 1.3,
                        }}
                    >
                        Your Mind Deserves the Same Care as Your Body
                    </h2>
                    <p
                        className="mt-5 max-w-xl mx-auto"
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: "#4a7c6b",
                            fontSize: "1.05rem",
                            lineHeight: 1.8,
                        }}
                    >
                        We obsess over steps counted, calories burned, and protein consumed — but when did we last check in with how our mind feels?
                    </p>
                </div>

                {/* Two-column comparison */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div
                        className="rounded-3xl p-8 relative overflow-hidden flex flex-col h-full"
                        style={{
                            background: "white",
                            boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
                            border: "1px solid rgba(46,204,113,0.15)",
                            minHeight: 320,
                        }}
                    >
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                            style={{ background: "linear-gradient(135deg, #d5f5e3, #a9dfbf)" }}
                        >
                            <span style={{ fontSize: "1.8rem" }}>💪</span>
                        </div>
                        <h3
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "#1a4a3f",
                                fontSize: "1.6rem",
                                fontWeight: 600,
                                marginBottom: "1rem",
                            }}
                        >
                            Physical Health
                        </h3>
                        <p className="flex-grow" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a8f7b", lineHeight: 1.75, fontSize: "1.05rem" }}>
                            Daily workouts, balanced diets, step goals, sleep tracking. We have entire ecosystems built to help our bodies thrive — and we celebrate this.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2">
                            {["Exercise", "Nutrition", "Sleep", "Hydration"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 rounded-full text-sm"
                                    style={{ background: "#e8f7f2", color: "#1a7a50", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div
                        className="rounded-3xl p-8 relative overflow-hidden flex flex-col h-full"
                        style={{
                            background: "linear-gradient(135deg, #175446, #1f6b5a)",
                            boxShadow: "0 4px 40px rgba(13,61,46,0.25)",
                            minHeight: 320,
                        }}
                    >
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                            style={{ background: "rgba(255,255,255,0.15)" }}
                        >
                            <span style={{ fontSize: "1.8rem" }}>🧠</span>
                        </div>
                        <h3
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "white",
                                fontSize: "1.6rem",
                                fontWeight: 600,
                                marginBottom: "1rem",
                            }}
                        >
                            Mental Health
                        </h3>
                        <p className="flex-grow" style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, fontSize: "1.05rem" }}>
                            Reflection, emotional regulation, journaling, guided routines. ManoBandhu brings the same daily discipline to your emotional world — gently, joyfully.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2">
                            {["Reflection", "Journaling", "Regulation", "Rituals"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 rounded-full text-sm"
                                    style={{
                                        background: "rgba(255,255,255,0.12)",
                                        color: "rgba(255,255,255,0.9)",
                                        fontFamily: "'Nunito', sans-serif",
                                        fontWeight: 600,
                                        border: "1px solid rgba(255,255,255,0.2)",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ManoBandhu meaning */}
                <div
                    className="rounded-3xl p-10 text-center"
                    style={{
                        background: "white",
                        boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
                        border: "1px solid rgba(46,204,113,0.12)",
                    }}
                >
                    <div className="flex justify-center mb-4">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #d5f5e3, #a9dfbf)" }}
                        >
                            <span style={{ fontSize: "2rem" }}>🌺</span>
                        </div>
                    </div>
                    <p
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#0d3d2e",
                            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                            fontStyle: "italic",
                            lineHeight: 1.6,
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        "ManoBandhu" — from Sanskrit,{" "}
                        <em style={{ color: "#1a7a50" }}>Mano</em> (mind) and{" "}
                        <em style={{ color: "#1a7a50" }}>Bandhu</em> (friend). Your mind's trusted companion, always by your side.
                    </p>
                    <p
                        className="mt-4"
                        style={{ fontFamily: "'Nunito', sans-serif", color: "#6ba88a", fontSize: "0.95rem" }}
                    >
                        Because everyone deserves a gentle friend for their inner world.
                    </p>
                </div>
            </div>
        </section>
    );
}
