import { motion } from "motion/react";

export function PilotStudyPage() {
  return (
    <div
      style={{
        minHeight: "60vh",
        background: "linear-gradient(160deg, #f0faf7 0%, #e8f5f0 40%, #fafff8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 20px 60px",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center" }}
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
          ManoBandhu Pilot Study
        </h1>
        <p style={{ color: "#4a7a6a", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Thank you for your interest in our pilot study. Scroll to the bottom of the home page to join the waitlist!
        </p>
      </motion.div>
    </div>
  );
}
