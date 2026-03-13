import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Target, TrendingUp, Globe, Layers } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const pillars = [
  {
    icon: <Target size={22} />,
    title: "Self-Awareness",
    desc: "Daily practices that help you understand your own emotions, patterns, and triggers — before they control you.",
    color: "#EFF6FF",
    accent: "#2563EB",
    emoji: "🔍",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Belief in Growth",
    desc: "Evidence-based journeys that nurture a growth mindset — transforming challenges into stepping stones.",
    color: "#F0FDF4",
    accent: "#16A34A",
    emoji: "🌱",
  },
  {
    icon: <Layers size={22} />,
    title: "Daily Consistency",
    desc: "Gamified habits that make showing up for your mental health as natural as brushing your teeth.",
    color: "#FFF7ED",
    accent: "#EA580C",
    emoji: "⭐",
  },
  {
    icon: <Globe size={22} />,
    title: "Online–Offline Bridge",
    desc: "What you build in the app becomes real in life — habits, connections, and emotional resilience.",
    color: "#F5F3FF",
    accent: "#7C3AED",
    emoji: "🌉",
  },
];

const timeline = [
  { year: "The Problem", text: "197 million Indians need mental health support, yet access remains a crisis-response model, not a daily practice." },
  { year: "The Gap", text: "Existing solutions offer therapy access or passive content — but no structured emotional infrastructure for daily habit-building." },
  { year: "The Insight", text: "Samruddhi's personal therapy journey revealed that consistency, reflection, and community are the real drivers of lasting change." },
  { year: "The Solution", text: "ManoBandhu — a gamified island universe that makes daily emotional care engaging, evidence-based, and deeply personal." },
];

export function Mission() {
  return (
    <section id="mission" className="py-24 px-6" style={{ background: "#F0F7FF" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4"
              style={{ background: "rgba(37,99,235,0.1)", color: "#2563EB", fontWeight: 600 }}
            >
              <Target size={14} /> Our Mission
            </div>
            <h2 className="mb-4" style={{ color: "#0F2A4A" }}>
              Building India's
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Emotional Infrastructure
              </span>
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
              ManoBandhu was born from a simple but profound belief: emotional well-being is not built
              in moments of crisis. It is built daily — through awareness of self, belief in growth,
              and the consistency to show up every day.
            </p>
          </div>
        </FadeIn>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl p-6 text-center"
                style={{ background: pillar.color, border: `1.5px solid ${pillar.accent}20` }}
              >
                <div className="text-4xl mb-3">{pillar.emoji}</div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: pillar.accent, color: "white" }}
                >
                  {pillar.icon}
                </div>
                <h4 className="mb-2" style={{ color: "#0F2A4A" }}>{pillar.title}</h4>
                <p className="text-sm" style={{ color: "#6B7280", lineHeight: "1.65" }}>{pillar.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Problem → Solution Journey */}
        <FadeIn delay={0.2}>
          <div
            className="rounded-3xl p-8 md:p-10 mb-16"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}
          >
            <h3 className="text-center mb-8" style={{ color: "#0F2A4A" }}>
              From Problem to Purpose
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-6 top-6 bottom-6 w-0.5 hidden md:block"
                style={{ background: "linear-gradient(to bottom, #2563EB, #7C3AED)" }}
              />
              <div className="flex flex-col gap-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="flex items-start gap-6"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white text-sm z-10"
                      style={{
                        background: `linear-gradient(135deg, hsl(${220 + i * 20}, 80%, ${50 + i * 3}%), hsl(${240 + i * 20}, 75%, ${55 + i * 3}%))`,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="flex-1 rounded-2xl p-5"
                      style={{ background: "#F8FAFC", border: "1px solid rgba(0,0,0,0.05)" }}
                    >
                      <p className="text-xs mb-1" style={{ color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {item.year}
                      </p>
                      <p style={{ color: "#374151", lineHeight: "1.65" }}>{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Big Statement */}
        <FadeIn delay={0.3}>
          <div
            className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 50%, #0EA5E9 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 60 + 20,
                    height: Math.random() * 60 + 20,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: "rgba(255,255,255,0.3)",
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">🌏</div>
              <h2 className="mb-4 text-white">
                197 Million Reasons
                <br />
                to Build This
              </h2>
              <p className="max-w-2xl mx-auto mb-6" style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.7" }}>
                India has 197 million people who need mental health support. ManoBandhu is here to be
                the daily companion — the mind's friend — for every single one of them.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { num: "197M", label: "People Need Support" },
                  { num: "Daily", label: "Habit Building" },
                  { num: "∞", label: "Possibilities" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="px-6 py-3 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                  >
                    <div className="text-2xl text-white" style={{ fontWeight: 800 }}>{stat.num}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
