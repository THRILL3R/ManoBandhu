import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export function PilotStudyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    occupation: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to /api/v1/waitlist
    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f0faf7 0%, #e8f5f0 40%, #fafff8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px 60px",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#1a4a3a",
            marginBottom: "12px",
            letterSpacing: "-0.02em",
          }}
        >
          Join Our Pilot Study
        </h1>
        <p style={{ color: "#4a7a6a", fontSize: "1.1rem", maxWidth: "480px", margin: "0 auto" }}>
          Be among the first to experience ManoBandhu. Our 8-week pilot study begins in June 2026.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 40px rgba(0,100,60,0.10)",
          padding: "40px 36px",
          width: "100%",
          maxWidth: "680px",
        }}
      >
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <Field
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <Field
                label="Mobile Number"
                name="mobile"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.mobile}
                onChange={handleChange}
                required
              />
              <Field
                label="Occupation"
                name="occupation"
                type="text"
                placeholder="Your occupation"
                value={form.occupation}
                onChange={handleChange}
              />
            </div>

            {/* Row 3 — full width */}
            <div style={{ marginBottom: "28px" }}>
              <Field
                label="City"
                name="city"
                type="text"
                placeholder="Your city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: "15px",
                background: "linear-gradient(135deg, #1a7a5a, #2da878)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.05rem",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 18px rgba(26,122,90,0.30)",
                letterSpacing: "0.01em",
              }}
            >
              Join the Waitlist
            </motion.button>

            <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: "0.8rem", marginTop: "12px" }}>
              No spam. We'll only reach out about the pilot study.
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", padding: "40px 0" }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle size={64} style={{ color: "#1a7a5a" }} />
            </motion.div>
            <h2 style={{ color: "#1a4a3a", marginTop: "20px", marginBottom: "10px" }}>
              You're on the list! 🎉
            </h2>
            <p style={{ color: "#4a7a6a", maxWidth: "320px", margin: "0 auto" }}>
              Welcome, {form.fullName}! We'll be in touch before June 2026 with your pilot study details.
            </p>
            <div style={{ fontSize: "2rem", marginTop: "20px" }}>🌿🧠✨</div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ── Reusable field component ───────────────────────────────────────────────────
function Field({
  label, name, type, placeholder, value, onChange, required,
}: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          display: "block", marginBottom: "6px",
          fontSize: "0.88rem", fontWeight: 600, color: "#374151",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "11px 14px",
          borderRadius: "10px",
          border: "1.5px solid #D1FAE5",
          background: "#F9FFFE",
          color: "#1a4a3a",
          fontSize: "0.95rem",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#1a7a5a")}
        onBlur={(e) => (e.target.style.borderColor = "#D1FAE5")}
      />
    </div>
  );
}
