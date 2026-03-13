import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "The Platform", href: "#platform" },
  { label: "Our Team", href: "#team" },
  { label: "Mission", href: "#mission" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255,251,245,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#home")}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm shrink-0"
            style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
          >
            🐾
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-xl tracking-tight"
              style={{ color: "#1E3A5F", fontWeight: 800 }}
            >
              ManoBandhu
            </span>
            <span className="text-[10px] tracking-widest uppercase" style={{ color: "#6B7280" }}>
              मनो • बंधु • MindCare
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-blue-50"
              style={{ color: "#374151", fontWeight: 500 }}
            >
              {link.label}
            </button>
          ))}
          <button
            className="ml-3 px-5 py-2 rounded-full text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
              fontWeight: 600,
            }}
            onClick={() => handleNav("#contact")}
          >
            Join Waitlist 🌟
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "#1E3A5F" }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(255,251,245,0.98)", backdropFilter: "blur(12px)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-1 border-t border-gray-100">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-sm transition-all hover:bg-blue-50"
                  style={{ color: "#374151", fontWeight: 500 }}
                >
                  {link.label}
                </button>
              ))}
              <button
                className="mt-2 px-5 py-3 rounded-full text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                  fontWeight: 600,
                }}
                onClick={() => handleNav("#contact")}
              >
                Join Waitlist 🌟
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
