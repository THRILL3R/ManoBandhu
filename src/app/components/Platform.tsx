import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Compass, Star, Zap, Shield, Users } from "lucide-react";
import islandImg from "../../assets/5542da11d53acb4e3b8064b4e656553934e96428.png";
import dogImg from "../../assets/095cffbe8cfa0dc7b54b3da09fc8cee8f5649ed1.png";

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

const islandZones = [
  {
    icon: "🏠",
    name: "Diary Cabin",
    color: "#FFF7ED",
    border: "rgba(251,146,60,0.3)",
    tag: "#F97316",
    desc: "Your daily emotional journal — reflect, record, and revisit your inner world",
  },
  {
    icon: "🎪",
    name: "Activity Fair",
    color: "#EFF6FF",
    border: "rgba(59,130,246,0.3)",
    tag: "#2563EB",
    desc: "Mindfulness exercises, breathing activities, and interactive wellbeing games",
  },
  {
    icon: "🤝",
    name: "Society Club",
    color: "#F0FDF4",
    border: "rgba(34,197,94,0.3)",
    tag: "#16A34A",
    desc: "Community circles, peer support groups, and shared growth experiences",
  },
  {
    icon: "🎡",
    name: "Joy Wheel",
    color: "#FDF4FF",
    border: "rgba(168,85,247,0.3)",
    tag: "#9333EA",
    desc: "Emotion tracking through play — spin to discover and process your feelings",
  },
  {
    icon: "🏥",
    name: "Therapy Support",
    color: "#FFF1F2",
    border: "rgba(239,68,68,0.3)",
    tag: "#DC2626",
    desc: "Direct bridge to professional therapists when you need real human support",
  },
  {
    icon: "🗺️",
    name: "Cave of Challenges",
    color: "#F8FAFC",
    border: "rgba(100,116,139,0.3)",
    tag: "#475569",
    desc: "Deep dive exercises for facing fears, building resilience, and inner exploration",
  },
];

const features = [
  {
    icon: <Zap size={20} />,
    title: "Habit-Based Architecture",
    desc: "Daily quests and streaks that build lasting emotional habits — not just crisis interventions",
    color: "#FFF7ED",
    accent: "#F97316",
  },
  {
    icon: <Compass size={20} />,
    title: "Reflective Journey",
    desc: "Self-awareness tools inspired by evidence-based psychology, woven into every island activity",
    color: "#EFF6FF",
    accent: "#2563EB",
  },
  {
    icon: <Shield size={20} />,
    title: "Safe & Structured",
    desc: "Clinically informed emotional infrastructure — guided by 40+ years of holistic health wisdom",
    color: "#F0FDF4",
    accent: "#16A34A",
  },
  {
    icon: <Users size={20} />,
    title: "Online–Offline Bridge",
    desc: "The app anchors daily habits that translate into real-world emotional skills and relationships",
    color: "#FDF4FF",
    accent: "#9333EA",
  },
];

export function Platform() {
  return (
    <section id="platform" className="py-24 px-6" style={{ background: "#F0F7FF" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4"
              style={{ background: "rgba(59,130,246,0.1)", color: "#2563EB", fontWeight: 600 }}
            >
              <MapPin size={14} /> The Platform
            </div>
            <h2 className="mb-4" style={{ color: "#0F2A4A" }}>
              Welcome to Your
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #2563EB, #0EA5E9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Emotional Island Universe
              </span>
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
              A gamified world where every zone serves your emotional growth. Explore, play, reflect, and
              grow — guided by your loyal companion dog and backed by clinical expertise.
            </p>
          </div>
        </FadeIn>

        {/* Island Image */}
        <FadeIn delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16">
            <img
              src={islandImg}
              alt="ManoBandhu Island Universe"
              className="w-full"
              style={{ maxHeight: "480px", objectFit: "cover" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(15,42,74,0.6) 0%, transparent 50%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-3">
                {["Diary Cabin", "Society Club", "Activity Fair", "Therapy Support", "Joy Wheel"].map((zone) => (
                  <span
                    key={zone}
                    className="px-4 py-2 rounded-full text-sm"
                    style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)", fontWeight: 500 }}
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>
            {/* Dog guide badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg"
              style={{ background: "rgba(255,251,245,0.95)", backdropFilter: "blur(8px)" }}
            >
              <img src={dogImg} alt="dog guide" className="w-10 h-8 object-cover rounded-lg" />
              <span className="text-sm" style={{ color: "#0F2A4A", fontWeight: 600 }}>
                Your Guide 🐾
              </span>
            </motion.div>
          </div>
        </FadeIn>

        {/* Companion Dog Section */}
        <FadeIn delay={0.15}>
          <div
            className="rounded-3xl p-8 mb-16 flex flex-col md:flex-row items-center gap-8"
            style={{ background: "linear-gradient(135deg, #FFF7ED, #FEF3C7)", border: "1px solid rgba(251,191,36,0.25)" }}
          >
            <div className="shrink-0">
              <motion.img
                src={dogImg}
                alt="Companion Dog"
                className="w-40 h-32 object-cover rounded-2xl shadow-lg"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} style={{ color: "#F59E0B" }} />
                <span className="text-sm" style={{ color: "#92400E", fontWeight: 700 }}>Your Loyal Companion</span>
              </div>
              <h3 className="mb-3" style={{ color: "#78350F" }}>
                Meet Your Island Guide 🐾
              </h3>
              <p style={{ color: "#92400E", lineHeight: "1.7" }}>
                A warm, playful companion dog will be with you every step of your journey through the island
                universe. More than just a guide — it's your emotional anchor. When the world feels heavy,
                your companion will be there to remind you: you are never alone. Every quest, every check-in,
                every breakthrough — celebrated together.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Island Zones Grid */}
        <FadeIn delay={0.2}>
          <h3 className="text-center mb-8" style={{ color: "#0F2A4A" }}>
            Explore the Island Zones
          </h3>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {islandZones.map((zone, i) => (
            <FadeIn key={zone.name} delay={0.1 + i * 0.05}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl p-6 cursor-pointer"
                style={{ background: zone.color, border: `1.5px solid ${zone.border}` }}
              >
                <div className="text-3xl mb-3">{zone.icon}</div>
                <h4 className="mb-2" style={{ color: "#0F2A4A" }}>{zone.name}</h4>
                <p className="text-sm" style={{ color: "#6B7280", lineHeight: "1.6" }}>{zone.desc}</p>
                <div
                  className="mt-3 inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full"
                  style={{ background: `${zone.tag}15`, color: zone.tag, fontWeight: 600 }}
                >
                  Explore →
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Features */}
        <FadeIn delay={0.2}>
          <h3 className="text-center mb-8" style={{ color: "#0F2A4A" }}>
            Why ManoBandhu is Different
          </h3>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={0.1 + i * 0.07}>
              <div
                className="rounded-2xl p-6 flex items-start gap-4"
                style={{ background: feature.color, border: `1.5px solid ${feature.accent}20` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: feature.accent, color: "white" }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h4 className="mb-1" style={{ color: "#0F2A4A" }}>{feature.title}</h4>
                  <p className="text-sm" style={{ color: "#6B7280", lineHeight: "1.6" }}>{feature.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
