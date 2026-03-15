import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = "idle" | "loading" | "success" | "error" | "duplicate";

interface FormState {
  full_name: string;
  email: string;
  mobile: string;
  occupation: string;
  city: string;
}

interface FieldErrors {
  full_name?: string;
  email?: string;
  mobile?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(form: FormState): FieldErrors {
  const errs: FieldErrors = {};
  if (!form.full_name.trim() || form.full_name.trim().length < 2)
    errs.full_name = "Full name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = "Please enter a valid email address.";
  if (!/^(\+91|91)?[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, "")))
    errs.mobile = "Enter a valid 10-digit Indian mobile number.";
  return errs;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#ffffff",
  border: "1.5px solid #D1E8DF",
  borderRadius: "999px",
  padding: "14px 20px",
  fontSize: "0.95rem",
  color: "#1A3C2E",
  fontFamily: "'Nunito', sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "0.88rem",
  fontWeight: 600,
  color: "#1A5C4A",
  fontFamily: "'Nunito', sans-serif",
};

// ─── Spinner ─────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 18,
        height: 18,
        border: "2.5px solid rgba(255,255,255,0.4)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        verticalAlign: "middle",
        marginRight: 8,
      }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function WaitlistSection() {
  const [form, setForm] = useState<FormState>({
    full_name: "", email: "", mobile: "", occupation: "", city: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear field error on change
      if (fieldErrors[field as keyof FieldErrors])
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }

    setStatus("loading");
    setErrorMsg("");

    try {
      // 1. Submit to Backend API
      const res = await fetch(`${API_BASE}/api/v1/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mobile: `+91${form.mobile.replace(/\s/g, "")}` }),
      });
      const json = await res.json();

      if (res.status === 201 || res.ok) {
        // 2. Also submit to Google Sheets
        const SHEETS_URL = import.meta.env.VITE_SHEETS_URL;
        if (SHEETS_URL) {
          try {
            await fetch(SHEETS_URL, {
              method: "POST",
              mode: "no-cors", // Required for Google Apps Script
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...form, sheet: "Waitlist" }),
            });
          } catch (e) {
            console.error("Sheets sync failed:", e);
          }
        }
        setStatus("success");
      } else if (res.status === 200) {
        // 200 = already registered
        setStatus("duplicate");
      } else {
        setStatus("error");
        setErrorMsg(json.error?.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Spin keyframe injected once */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <section
        id="waitlist"
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #fff3e6 0%, #f0faf7 100%)",
          padding: "96px 24px",
        }}
      >
        {/* Wave top */}
        <div className="absolute top-0 left-0 w-full" style={{ height: "4vw", minHeight: 30, transform: "rotate(180deg)" }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <path d="M0,0V120H1200V0C1100,60,950,110,600,60C250,10,100,60,0,0Z" fill="#fff9f0" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Section heading */}
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#1a6b5a", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700, marginBottom: "1rem" }}>
              Join Our Pilot Study
            </h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6ba88a", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
              Be among the first to experience ManoBandhu. Our 8-week pilot study begins in June 2026.
            </p>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "#fff",
              borderRadius: 32,
              padding: "48px 40px",
              border: "1.5px solid #e3efe9",
              boxShadow: "0 20px 60px rgba(26,107,90,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative blobs */}
            <div style={{ position: "absolute", top: 0, right: 0, width: 240, height: 240, background: "#f0faf7", borderRadius: "50%", filter: "blur(60px)", opacity: 0.6, transform: "translate(33%,-33%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 240, height: 240, background: "#fcf3fc", borderRadius: "50%", filter: "blur(60px)", opacity: 0.6, transform: "translate(-33%,33%)", pointerEvents: "none" }} />

            <AnimatePresence mode="wait">
              {/* ── SUCCESS STATE ── */}
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center", padding: "32px 0", position: "relative", zIndex: 1 }}
                >
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1A5C4A, #2A9D8F)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(26,92,74,0.25)",
                  }}>
                    <span style={{ fontSize: 32, color: "#fff" }}>✓</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#1A5C4A", fontSize: "1.8rem", marginBottom: 14 }}>
                    You're on the list! 💚
                  </h3>
                  <p style={{ color: "#4a7a6a", fontFamily: "'Nunito', sans-serif", fontSize: "1rem", maxWidth: 380, margin: "0 auto" }}>
                    Check your email for a confirmation from us. We'll be in touch before June 2026.
                  </p>
                  <div style={{ fontSize: "2rem", marginTop: 20 }}>🌿✨</div>
                </motion.div>

              ) : (
                /* ── FORM STATE ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  style={{ position: "relative", zIndex: 1 }}
                  noValidate
                >
                  {/* Row 1: Full Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    {/* Full Name */}
                    <div>
                      <label style={labelStyle}>Full Name <span style={{ color: "#e05" }}>*</span></label>
                      <input style={inputStyle} type="text" value={form.full_name} onChange={set("full_name")}
                        placeholder="Enter your name"
                        onFocus={(e) => (e.target.style.borderColor = "#2A9D8F")}
                        onBlur={(e) => (e.target.style.borderColor = "#D1E8DF")} />
                      {fieldErrors.full_name && <p style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4, paddingLeft: 12 }}>{fieldErrors.full_name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>Email Address <span style={{ color: "#e05" }}>*</span></label>
                      <input style={inputStyle} type="email" value={form.email} onChange={set("email")}
                        placeholder="your@email.com"
                        onFocus={(e) => (e.target.style.borderColor = "#2A9D8F")}
                        onBlur={(e) => (e.target.style.borderColor = "#D1E8DF")} />
                      {fieldErrors.email && <p style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4, paddingLeft: 12 }}>{fieldErrors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Mobile + Occupation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    {/* Mobile with +91 prefix */}
                    <div>
                      <label style={labelStyle}>Mobile Number <span style={{ color: "#e05" }}>*</span></label>
                      <div style={{ display: "flex", alignItems: "center", background: "#fff", border: "1.5px solid #D1E8DF", borderRadius: 999, overflow: "hidden", transition: "border-color 0.2s" }}
                        onFocusCapture={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#2A9D8F")}
                        onBlurCapture={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#D1E8DF")}>
                        <span style={{ padding: "14px 12px 14px 20px", color: "#1A5C4A", fontWeight: 700, fontFamily: "'Nunito', sans-serif", fontSize: "0.95rem", whiteSpace: "nowrap" }}>+91</span>
                        <div style={{ width: "1px", height: 20, background: "#D1E8DF" }} />
                        <input
                          style={{ ...inputStyle, border: "none", borderRadius: 0, paddingLeft: 12, flex: 1 }}
                          type="tel" value={form.mobile} onChange={set("mobile")}
                          placeholder="98765 43210" maxLength={10} />
                      </div>
                      {fieldErrors.mobile && <p style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: 4, paddingLeft: 12 }}>{fieldErrors.mobile}</p>}
                    </div>

                    {/* Occupation */}
                    <div>
                      <label style={labelStyle}>Occupation</label>
                      <input style={inputStyle} type="text" value={form.occupation} onChange={set("occupation")}
                        placeholder="Your occupation"
                        onFocus={(e) => (e.target.style.borderColor = "#2A9D8F")}
                        onBlur={(e) => (e.target.style.borderColor = "#D1E8DF")} />
                    </div>
                  </div>

                  {/* Row 3: City full width */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle}>City</label>
                    <input style={inputStyle} type="text" value={form.city} onChange={set("city")}
                      placeholder="Your city"
                      onFocus={(e) => (e.target.style.borderColor = "#2A9D8F")}
                      onBlur={(e) => (e.target.style.borderColor = "#D1E8DF")} />
                  </div>

                  {/* Duplicate message */}
                  {status === "duplicate" && (
                    <div style={{ marginBottom: 16, padding: "12px 20px", background: "#FFF7ED", border: "1.5px solid #FED7AA", borderRadius: 999, textAlign: "center", color: "#92400e", fontFamily: "'Nunito', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}>
                      🌿 You're already on our waitlist! We'll be in touch soon.
                    </div>
                  )}

                  {/* Error message */}
                  {status === "error" && (
                    <div style={{ marginBottom: 16, padding: "12px 20px", background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 999, textAlign: "center", color: "#dc2626", fontFamily: "'Nunito', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}>
                      {errorMsg || "Something went wrong. Please try again."}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      width: "100%",
                      padding: "16px",
                      background: status === "loading" ? "#2A9D8F" : "linear-gradient(135deg, #1A7A6E, #2A9D8F)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      borderRadius: 999,
                      border: "none",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      opacity: status === "loading" ? 0.75 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      fontFamily: "'Nunito', sans-serif",
                      letterSpacing: "0.3px",
                      boxShadow: "0 8px 24px rgba(42,157,143,0.30)",
                      transition: "opacity 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.background = "#1A7A6E"; }}
                    onMouseLeave={(e) => { if (status !== "loading") (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #1A7A6E, #2A9D8F)"; }}
                  >
                    {status === "loading" && <Spinner />}
                    {status === "loading" ? "Submitting..." : "Join the Waitlist"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
