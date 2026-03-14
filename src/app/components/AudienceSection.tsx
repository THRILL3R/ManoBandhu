const audiences = [
    {
        emoji: "🎓",
        title: "Students",
        description:
            "Navigating exams, choices, and identity. ManoBandhu is a space to understand yourself better, express what you're feeling, and build the emotional vocabulary that school never taught you.",
        tags: ["Self-understanding", "Expression", "Identity", "Emotional literacy"],
        color: "#6366f1",
        bg: "#eef2ff",
        textColor: "#312e81",
    },
    {
        emoji: "💼",
        title: "Working Professionals",
        description:
            "Busy days, full schedules, quiet inner lives. ManoBandhu helps you stay in touch with yourself — gently, without adding pressure — so you can show up with more clarity and kindness.",
        tags: ["Self-awareness", "Clarity", "Balance", "Gentle routines"],
        color: "#0891b2",
        bg: "#ecfeff",
        textColor: "#164e63",
    },
    {
        emoji: "🏡",
        title: "Homemakers & Caregivers",
        description:
            "When you carry so much for others, ManoBandhu is the space that holds you. Explore your inner world, express what you rarely share, and learn to be as gentle with yourself as you are with your work.",
        tags: ["Self-care", "Reflection", "Inner space", "Emotional rest"],
        color: "#d97706",
        bg: "#fffbeb",
        textColor: "#78350f",
    },
];

export function AudienceSection() {
    return (
        <div id="who-its-for" className="flex flex-col">
            <section
                className="relative pt-24 pb-16 px-6 overflow-hidden"
                style={{ background: "linear-gradient(180deg, #fff9f0 0%, #f0faf7 100%)" }}
            >

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full mb-4"
                        style={{
                            background: "rgba(99,102,241,0.1)",
                            color: "#4338ca",
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                        }}
                    >
                        WHO IT'S FOR
                    </span>
                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#0d3d2e",
                            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                            fontWeight: 700,
                            lineHeight: 1.3,
                        }}
                    >
                        For Everyone Who Wants to
                        <span
                            style={{
                                display: "block",
                                fontStyle: "italic",
                                color: "#1a9e60",
                            }}
                        >
                            Know Themselves a Little Better
                        </span>
                    </h2>
                    <p
                        className="mt-4 max-w-xl mx-auto"
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: "#4a7c6b",
                            fontSize: "1.05rem",
                            lineHeight: 1.8,
                        }}
                    >
                        ManoBandhu is for the curious, the reflective, the quietly overwhelmed — anyone who wants to understand themselves more, express themselves freely, and be a little gentler with themselves and those around them.
                    </p>
                </div>

                {/* Audience cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {audiences.map((aud) => (
                        <div
                            key={aud.title}
                            className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                            style={{
                                background: aud.bg,
                                border: `1px solid ${aud.color}25`,
                                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                            }}
                        >
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 relative"
                                style={{ background: `${aud.color}18`, fontSize: "2rem" }}
                            >
                                <img
                                    src={aud.emoji === "🎓" ? "/student.png" : aud.emoji === "💼" ? "/briefcase.png" : "/house.png"}
                                    alt={aud.title}
                                    className="w-10 h-10 absolute inset-0 m-auto"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden') }}
                                />
                                <span className="hidden">{aud.emoji}</span>
                            </div>
                            <h3
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: aud.textColor,
                                    fontSize: "1.4rem",
                                    fontWeight: 700,
                                    marginBottom: "0.75rem",
                                }}
                            >
                                {aud.title}
                            </h3>
                            <p
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    color: `${aud.textColor}bb`,
                                    lineHeight: 1.75,
                                    fontSize: "0.95rem",
                                    marginBottom: "1.25rem",
                                }}
                            >
                                {aud.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {aud.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full text-xs"
                                        style={{
                                            background: `${aud.color}14`,
                                            color: aud.textColor,
                                            fontFamily: "'Nunito', sans-serif",
                                            fontWeight: 600,
                                            border: `1px solid ${aud.color}28`,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Anyone Finding Their Way */}
                <div className="mt-16 text-center max-w-3xl mx-auto">
                    <h3
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#0d3d2e",
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            marginBottom: "1rem",
                        }}
                    >
                        Anyone Finding Their Way
                    </h3>
                    <p
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: "#4a7c6b",
                            fontSize: "1.05rem",
                            lineHeight: 1.8,
                        }}
                    >
                        Between jobs, between phases, figuring things out. ManoBandhu meets you exactly where you are — no labels, no pressure, just a quiet space to understand yourself better every day.
                    </p>
                </div>
                </div>
            </section>

            {/* Ethos banners wrapper on white background */}
            <section className="relative px-6 pt-12 pb-24 bg-white z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Ethos banner */}
                    <div
                        className="rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
                    style={{
                        background: "linear-gradient(135deg, #e8f7f2, #d5f5e3)",
                        border: "1px solid rgba(46,204,113,0.2)",
                    }}
                >
                    <div style={{ fontSize: "3rem", flexShrink: 0 }}>🌺</div>
                    <div>
                        <h3
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "#0d4d3a",
                                fontSize: "1.3rem",
                                fontWeight: 600,
                                marginBottom: "0.5rem",
                            }}
                        >
                            This is not therapy. This is not self-help.
                        </h3>
                        <p
                            style={{
                                fontFamily: "'Nunito', sans-serif",
                                color: "#2d7a5e",
                                fontSize: "0.98rem",
                                lineHeight: 1.7,
                            }}
                        >
                            ManoBandhu is a daily practice — like stretching, like breathing, like writing in a diary. It's a space to understand yourself, express what you feel, and grow gentler towards yourself and the people in your life. No expertise required. Just a quiet willingness to look inward.
                        </p>
                    </div>
                </div>

                {/* Online & Offline note */}
                <div
                    className="mt-6 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
                    style={{
                        background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                        border: "1px solid rgba(41,128,185,0.18)",
                    }}
                >
                    <div style={{ fontSize: "3rem", flexShrink: 0 }}>🤝</div>
                    <div>
                        <h3
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "#1e3a5f",
                                fontSize: "1.3rem",
                                fontWeight: 600,
                                marginBottom: "0.5rem",
                            }}
                        >
                            Not just a platform — a living, breathing community
                        </h3>
                        <p
                            style={{
                                fontFamily: "'Nunito', sans-serif",
                                color: "#2d5986",
                                fontSize: "0.98rem",
                                lineHeight: 1.7,
                            }}
                        >
                            ManoBandhu exists online <em>and</em> offline. We actively encourage you to show up in the real world too — through wellness events, monthly community meetups, and group sessions. Because connection and presence are part of the practice.
                        </p>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
