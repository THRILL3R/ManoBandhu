import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, BookOpen, Heart } from "lucide-react";

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

const team = [
  {
    name: "Samruddhi Vadgave",
    role: "Founder",
    emoji: "✨",
    accent: "#2563EB",
    bg: "#EFF6FF",
    img: "https://images.unsplash.com/photo-1672075270227-ddf5cb181a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMEluZGlhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwc21pbGluZ3xlbnwxfHx8fDE3NzMwNDQyMDN8MA&ixlib=rb-4.1.0&q=80&w=400",
    credentials: ["MBA Graduate", "Analytics Expert", "Mental Health Advocate"],
    quote: "I took therapy and it changed my life. I want everyone to have that transformation — every single day.",
    bio: "Samruddhi's personal experience with mental health challenges, combined with her academic expertise in management and analytics, laid the foundation for ManoBandhu during her MBA tenure.",
  },
  {
    name: "Dr. Pravin Vadgave",
    role: "Co-Founder",
    emoji: "🩺",
    accent: "#059669",
    bg: "#ECFDF5",
    img: "https://images.unsplash.com/photo-1659353887222-630895f23cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBJbmRpYW4lMjBtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzA0NDIwNnww&ixlib=rb-4.1.0&q=80&w=400",
    credentials: ["MD Homeopath", "40+ Years Practice", "Holistic Health Expert"],
    quote: "True healing is holistic. When the mind heals, the body follows. When habits form, health sustains.",
    bio: "With over four decades of clinical practice, Dr. Pravin brings unmatched holistic health wisdom to ManoBandhu, ensuring every feature is grounded in genuine care and evidence.",
  },
  {
    name: "Kkomal Narsingani",
    role: "Therapist & Wellbeing Consultant",
    emoji: "🌿",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    img: "https://images.unsplash.com/photo-1635341539956-f71faf82d9df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMHRoZXJhcGlzdCUyMGNvdW5zZWxvciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMwNDQyMDZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    credentials: ["PG Diploma Counselling Psychology (TISS)", "20+ Years Experience", "Somatic & Mindfulness Expert"],
    quote: "Meaningful self-understanding and sustainable emotional change — that's the journey I walk with every individual.",
    bio: "With over 20 years of professional experience and formal training from TISS, Kkomal integrates counselling psychology, mindfulness, somatic awareness, and reflective practices to support hundreds of adults navigate identity, relationships, boundaries, and emotional overwhelm.",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 px-6" style={{ background: "#FDFAF6" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4"
              style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED", fontWeight: 600 }}
            >
              <Heart size={14} /> Our Team
            </div>
            <h2 className="mb-4" style={{ color: "#0F2A4A" }}>
              The Hearts Behind
              <br />
              ManoBandhu
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#6B7280" }}>
              A team of clinicians, educators, and dreamers united by one belief —
              everyone deserves to thrive emotionally, every single day.
            </p>
          </div>
        </FadeIn>

        {/* Team Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={0.1 + i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl overflow-hidden flex flex-col"
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                {/* Photo */}
                <div
                  className="h-52 relative overflow-hidden"
                  style={{ background: member.bg }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${member.bg}99 0%, transparent 60%)` }}
                  />
                  <div
                    className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-xs"
                    style={{ background: "rgba(255,255,255,0.92)", color: member.accent, fontWeight: 700 }}
                  >
                    {member.emoji} {member.role}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="mb-1" style={{ color: "#0F2A4A" }}>{member.name}</h4>

                  {/* Quote */}
                  <div
                    className="my-3 p-3 rounded-xl italic text-sm"
                    style={{ background: member.bg, color: "#4B5563", borderLeft: `3px solid ${member.accent}` }}
                  >
                    "{member.quote}"
                  </div>

                  <p className="text-sm mb-4 flex-1" style={{ color: "#6B7280", lineHeight: "1.65" }}>
                    {member.bio}
                  </p>

                  {/* Credentials */}
                  <div className="flex flex-col gap-2">
                    {member.credentials.map((cred) => (
                      <div key={cred} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: member.accent }}
                        />
                        <span className="text-xs" style={{ color: "#374151", fontWeight: 500 }}>
                          {cred}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Kkomal Extended Bio */}
        <FadeIn delay={0.3}>
          <div
            className="rounded-3xl p-8"
            style={{ background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)", border: "1px solid rgba(124,58,237,0.15)" }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)" }}
              >
                <BookOpen size={18} color="white" />
              </div>
              <div>
                <h4 className="mb-0.5" style={{ color: "#4C1D95" }}>Kkomal Narsingani's Approach</h4>
                <p className="text-sm" style={{ color: "#7C3AED", fontWeight: 600 }}>
                  Therapist & Wellbeing Consultant · PG Diploma in Counselling Psychology (TISS)
                </p>
              </div>
            </div>
            <p className="mb-4" style={{ color: "#4B5563", lineHeight: "1.75" }}>
              With over <strong>20 years of professional experience</strong> and formal training in counselling psychology,
              Kkomal has worked with hundreds of adults navigating identity, relationships, boundaries, and
              emotional overwhelm. Her practice integrates <strong>counselling psychology, mindfulness, somatic awareness,
              and reflective practices</strong> to support meaningful self-understanding and sustainable emotional change.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Award size={13} />, text: "PG Diploma – Counselling Psychology, TISS" },
                { icon: <Heart size={13} />, text: "Somatic & Mindfulness Integration" },
                { icon: <BookOpen size={13} />, text: "Identity, Relationships & Emotional Health" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{ background: "rgba(255,255,255,0.7)", color: "#5B21B6", fontWeight: 500 }}
                >
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
