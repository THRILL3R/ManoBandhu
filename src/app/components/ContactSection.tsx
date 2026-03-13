import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Send, CheckCircle } from "lucide-react";
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

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6" style={{ background: "#FDFAF6" }}>
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4"
              style={{ background: "rgba(59,130,246,0.1)", color: "#2563EB", fontWeight: 600 }}
            >
              <Mail size={14} /> Join the Journey
            </div>
            <h2 className="mb-4" style={{ color: "#0F2A4A" }}>
              Be the First to
              <br />
              Set Sail 🏝️
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#6B7280" }}>
              ManoBandhu is launching soon. Join our waitlist to be the first to
              explore your island universe and meet your companion guide.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl overflow-hidden shadow-xl"
            style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="grid md:grid-cols-2">
              {/* Left - Dog + message */}
              <div
                className="p-10 flex flex-col justify-between"
                style={{ background: "linear-gradient(135deg, #BFDBFE 0%, #BAE6FD 100%)" }}
              >
                <div>
                  <div className="text-4xl mb-4">🐾</div>
                  <h3 className="mb-3" style={{ color: "#0F2A4A" }}>
                    Your companion is waiting!
                  </h3>
                  <p style={{ color: "#1E3A5F", lineHeight: "1.7" }}>
                    Join thousands of people who are ready to build a healthier relationship with their mind —
                    one day, one habit, one island at a time.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "🏝️ Early access to the island universe",
                      "🐾 Meet your companion dog first",
                      "🎯 Founding member benefits",
                      "💌 Exclusive wellbeing content",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#1E3A5F" }}>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <motion.img
                  src={dogImg}
                  alt="companion dog"
                  className="mt-6 w-36 h-28 object-cover rounded-2xl shadow-lg self-start"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Right - Form */}
              <div className="p-10">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-center">
                    <h4 style={{ color: "#0F2A4A" }}>Join the Waitlist</h4>
                    <p className="text-sm mb-2" style={{ color: "#9CA3AF" }}>
                      Be among the first to experience ManoBandhu.
                    </p>
                    <div>
                      <label className="text-sm mb-1 block" style={{ color: "#374151", fontWeight: 500 }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Arjun Sharma"
                        required
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                          background: "#F8FAFC",
                          border: "1.5px solid #E2E8F0",
                          color: "#0F2A4A",
                          fontSize: "15px",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-1 block" style={{ color: "#374151", fontWeight: 500 }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                          background: "#F8FAFC",
                          border: "1.5px solid #E2E8F0",
                          color: "#0F2A4A",
                          fontSize: "15px",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white transition-all duration-200 hover:scale-105 hover:shadow-lg mt-2"
                      style={{
                        background: "linear-gradient(135deg, #2563EB, #0EA5E9)",
                        fontWeight: 600,
                        boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                      }}
                    >
                      <Send size={16} />
                      Join Waitlist 🌟
                    </button>
                    <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                      No spam. Just your mental health journey, starting soon.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center gap-4 py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle size={56} style={{ color: "#16A34A" }} />
                    </motion.div>
                    <h4 style={{ color: "#0F2A4A" }}>You're on board! 🎉</h4>
                    <p style={{ color: "#6B7280", maxWidth: "260px" }}>
                      Welcome to the ManoBandhu family, {name}! Your companion is already excited to meet you.
                    </p>
                    <div className="text-3xl">🐾🏝️✨</div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
