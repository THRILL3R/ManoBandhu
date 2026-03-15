import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Heart, Lightbulb, Users } from "lucide-react";

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

export function About() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: "#FDFAF6" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4"
              style={{ background: "rgba(59,130,246,0.1)", color: "#2563EB", fontWeight: 600 }}
            >
              <Heart size={14} /> Our Story
            </div>
            <h2 className="mb-4" style={{ color: "#0F2A4A" }}>
              Born from Personal Journey,
              <br />
              Built with Clinical Wisdom
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
              ManoBandhu was born from a simple but profound belief: emotional well-being is not built
              in moments of crisis — it is built daily, through awareness of self, belief in growth,
              and the consistency to show up every day.
            </p>
          </div>
        </FadeIn>

        {/* Company Origin */}
        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl p-8 md:p-10 mb-16 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #E0F2FE 100%)",
              border: "1px solid rgba(59,130,246,0.15)",
            }}
          >
            <div className="absolute top-4 right-6 text-6xl opacity-10">🏝️</div>
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #3B82F6, #0EA5E9)" }}
              >
                <Lightbulb size={18} color="white" />
              </div>
              <div>
                <h3 className="mb-1" style={{ color: "#0F2A4A" }}>The Idea That Changed Everything</h3>
                <p className="text-sm" style={{ color: "#2563EB", fontWeight: 600 }}>
                  ManoBandhu Mindcare Services Pvt Ltd
                </p>
              </div>
            </div>
            <p className="mb-4" style={{ color: "#374151" }}>
              India has <strong>197 million people</strong> who need mental health support —(Global Burden of Disease Study, The Lancet, 2017) but existing solutions
              focus on therapy access or passive content. ManoBandhu fills the gap with a habit-based,
              reflective, and structured emotional infrastructure.
            </p>
            <p style={{ color: "#374151" }}>
              We are not just a digital product. We are a <strong>bridge between the online and offline world</strong> —
              using the app as a daily anchor to help users build emotional habits that then encourage
              them to step into real life.
            </p>
          </div>
        </FadeIn>

        {/* Founders Section */}
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3B82F6, #0EA5E9)" }}
            >
              <Users size={16} color="white" />
            </div>
            <h3 style={{ color: "#0F2A4A" }}>The Father-Daughter Duo</h3>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Samruddhi */}
          <FadeIn delay={0.2}>
            <div
              className="rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #BFDBFE 0%, #BAE6FD 100%)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1672075270227-ddf5cb181a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMEluZGlhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwc21pbGluZ3xlbnwxfHx8fDE3NzMwNDQyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Samruddhi Vadgave"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs"
                  style={{ background: "rgba(255,255,255,0.9)", color: "#2563EB", fontWeight: 700 }}
                >
                  ✨ Founder
                </div>
              </div>
              <div className="p-6">
                <h4 className="mb-1" style={{ color: "#0F2A4A" }}>Samruddhi Vadgave</h4>
                <p className="text-sm mb-4" style={{ color: "#2563EB", fontWeight: 600 }}>
                  Founder | Management & Analytics
                </p>
                <p className="text-sm mb-4" style={{ color: "#6B7280", lineHeight: "1.7" }}>
                  Samruddhi's journey with ManoBandhu is deeply personal. Having faced her own mental health
                  challenges, she chose therapy — and it transformed her life. It was during her
                  <strong> MBA tenure</strong> that the idea crystallised into a company. Her background in
                  management and analytics gave her the tools to turn a heartfelt vision into a structured,
                  scalable solution.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["MBA", "Analytics", "Mental Health Advocate", "Founder"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ background: "#EFF6FF", color: "#1D4ED8", fontWeight: 500 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Dr. Pravin */}
          <FadeIn delay={0.3}>
            <div
              className="rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300"
              style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1659353887222-630895f23cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBJbmRpYW4lMjBtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzA0NDIwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dr. Pravin Vadgave"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs"
                  style={{ background: "rgba(255,255,255,0.9)", color: "#059669", fontWeight: 700 }}
                >
                  🩺 Co-Founder
                </div>
              </div>
              <div className="p-6">
                <h4 className="mb-1" style={{ color: "#0F2A4A" }}>Dr. Pravin Vadgave</h4>
                <p className="text-sm mb-4" style={{ color: "#059669", fontWeight: 600 }}>
                  Co-Founder | MD Homeopath · 40+ Years of Practice
                </p>
                <p className="text-sm mb-4" style={{ color: "#6B7280", lineHeight: "1.7" }}>
                  Samruddhi's father brings over <strong>four decades of clinical wisdom</strong> to ManoBandhu.
                  As an MD Homeopath with a deep understanding of holistic health, Dr. Pravin ensures that
                  the platform is grounded in evidence-based wellbeing principles, bridging traditional
                  healing wisdom with modern mental health practices.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["MD Homeopath", "40+ Years Practice", "Holistic Health", "Co-Founder"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ background: "#ECFDF5", color: "#065F46", fontWeight: 500 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Family Bond Banner */}
        <FadeIn delay={0.4}>
          <div
            className="rounded-3xl p-8 text-center mb-0"
            style={{
              background: "linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)",
              border: "1px solid rgba(251,191,36,0.25)",
            }}
          >
            <div className="text-4xl mb-3">👨‍👧</div>
            <h4 className="mb-2" style={{ color: "#92400E" }}>A Bond Built on Trust & Love</h4>
            <p style={{ color: "#78350F", maxWidth: "540px", margin: "0 auto" }}>
              The Vadgave duo represents the perfect union of lived experience and clinical expertise —
              a daughter's courage and a father's wisdom, together building India's emotional infrastructure.
            </p>
            <div className="flex justify-center gap-3 mt-5 flex-wrap">
              {[
                { emoji: "💛", text: "Family First" },
                { emoji: "🏥", text: "Clinical Foundation" },
                { emoji: "🎓", text: "Academic Rigour" },
                { emoji: "❤️", text: "Personal Journey" },
              ].map((item) => (
                <span
                  key={item.text}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm"
                  style={{ background: "rgba(255,255,255,0.7)", color: "#78350F", fontWeight: 500 }}
                >
                  {item.emoji} {item.text}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}