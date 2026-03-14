export function ApproachSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#1a6b5a",
                            fontSize: "clamp(2rem, 4vw, 2.5rem)",
                            fontWeight: 700,
                            marginBottom: "1rem"
                        }}
                    >
                        Our Approach
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: "#6ba88a",
                            fontSize: "1.1rem",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }}
                    >
                        A comprehensive dual approach to emotional wellbeing
                    </p>
                </div>

                {/* Two Columns */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left Column: Preventive Wellbeing */}
                    <div
                        className="rounded-[2rem] p-8 lg:p-10 relative bg-white"
                        style={{
                            border: "1.5px solid #a9dfbf",
                            boxShadow: "0 10px 40px rgba(26,107,90,0.06)",
                        }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 relative">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                                    style={{ background: "linear-gradient(135deg, #e3f2fd, #bbdefb)" }}
                                >
                                    <img src="/shield.png" alt="Shield" className="w-8 h-8 opacity-90 mix-blend-multiply" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden') }} />
                                    <span className="text-3xl hidden">🛡️</span>
                                </div>
                            </div>

                            <h3
                                className="mb-3"
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    color: "#1a6b5a",
                                    fontSize: "1.5rem",
                                    fontWeight: 700
                                }}
                            >
                                Preventive Wellbeing
                            </h3>
                            <p
                                className="mb-10"
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    color: "#88ad9e",
                                    fontSize: "1rem"
                                }}
                            >
                                Building emotional resilience before challenges arise.
                            </p>

                            <div className="w-full space-y-4">
                                {[
                                    { icon: "🎮", text: "Gamified ManoBandhu Platform with island universe" },
                                    { icon: "🌲", text: "Nature Expeditions — find stillness and inner wisdom in the natural world" },
                                    { icon: "📢", text: "Psychoeducation Campaigns — free awareness initiatives for underserved communities" }
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 rounded-xl w-full text-left"
                                        style={{ background: "#f5fbf9" }}
                                    >
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span style={{ fontFamily: "'Nunito', sans-serif", color: "#1a6b5a", fontSize: "0.95rem", fontWeight: 600 }}>
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Curative Support */}
                    <div
                        className="rounded-[2rem] p-8 lg:p-10 relative bg-white"
                        style={{
                            border: "1.5px solid #e8daef",
                            boxShadow: "0 10px 40px rgba(136,78,160,0.05)",
                        }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 relative">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                                    style={{ background: "linear-gradient(135deg, #f5eef8, #d7bde2)" }}
                                >
                                    <img src="/heart.png" alt="Heart" className="w-8 h-8 opacity-90 mix-blend-multiply" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden') }} />
                                    <span className="text-3xl hidden">💜</span>
                                </div>
                            </div>

                            <h3
                                className="mb-3"
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    color: "#884ea0",
                                    fontSize: "1.5rem",
                                    fontWeight: 700
                                }}
                            >
                                Curative Support
                            </h3>
                            <p
                                className="mb-10"
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    color: "#aeb6bf",
                                    fontSize: "1rem"
                                }}
                            >
                                Structured support when you need it most.
                            </p>

                            <div className="w-full space-y-4">
                                {[
                                    { icon: "🎓", text: "Specialized Workshops — for healing, grief, and trauma recovery" },
                                    { icon: "💬", text: "Listening Circles — you are not alone. Share, grieve, accept, and heal together" },
                                    { icon: "📚", text: "Learning Programs (Coming Soon) — skill-building that reflects in your personality" }
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 rounded-xl w-full text-left"
                                        style={{ background: "#fcf3fc" }}
                                    >
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span style={{ fontFamily: "'Nunito', sans-serif", color: "#6c3483", fontSize: "0.95rem", fontWeight: 600 }}>
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
