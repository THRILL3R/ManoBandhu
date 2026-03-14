import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import './RippleBtn.css';

export function NewNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Explore the Blog", path: "/blogs" },
    { name: "Contact", path: "/contact" },
    { name: "Events", path: "/events" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Enforce solid background on pages that don't have a dark hero section
  const isLightPage = location.pathname.startsWith('/blog') || location.pathname.startsWith('/events');
  const isNavSolid = scrolled || isLightPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed outer strip */}
      <div
        className="fixed top-0 left-0 right-0 z-[1001]"
        style={{
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          background: isNavSolid ? "rgba(43, 110, 106, 0.95)" : "transparent",
          backdropFilter: isNavSolid ? "blur(16px)" : "none",
          boxShadow: isNavSolid ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
          borderBottom: isNavSolid ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}
      >
        {/* ── Desktop container ── */}
        <div
          className="hidden md:flex items-center w-full"
          style={{
            height: "var(--nav-h, 72px)",
            padding: "0 20px",
          }}
        >
          {/* Logo image — left */}
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: "none", flexShrink: 0 }}>
            <img
              src="/mb-white-logo.png"
              alt="ManoBandhu"
              style={{ height: 44, width: "auto", display: "block", objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#fff",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              ManoBandhu MindCare Services
            </span>
          </Link>

          {/* Push pill to center */}
          <div style={{ flex: 1 }} />

          {/* Teal pill — nav links */}
          <div
            className="flex items-center gap-1"
            style={{
              background: isNavSolid ? "rgba(255,255,255,0.1)" : "rgba(30, 90, 85, 0.75)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "999px",
              padding: "5px 6px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
              transition: "background 0.3s ease",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: isActive(link.path) ? 700 : 500,
                  textDecoration: "none",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  transition: "all 0.2s",
                  background: isActive(link.path) ? "#fff" : "transparent",
                  color: isActive(link.path) ? "#1a4a46" : "rgba(255,255,255,0.85)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path))
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path))
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Push CTA to right */}
          <div style={{ flex: 1 }} />

          {/* CTA — right */}
          <Link
            to="/pilot-study"
            className="ripple-btn"
            style={{
              background: isNavSolid ? "#3D9990" : "#2E7B74",
              transition: "background 0.3s ease",
            }}
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Join The Study
            <span className="animation" />
          </Link>
        </div>

        {/* ── Mobile header ── */}
        <div
          className="flex md:hidden items-center justify-between w-full"
          style={{ height: 64, padding: "0 16px" }}
        >
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
            <img
              src="/mb-white-logo.png"
              alt="ManoBandhu"
              style={{ height: 36, width: "auto", display: "block", objectFit: "contain" }}
            />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
              ManoBandhu
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "999px",
              padding: "6px 12px",
              cursor: "pointer",
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="fixed md:hidden z-40"
          style={{
            top: 64,
            left: 12,
            right: 12,
            background: "rgba(30, 85, 80, 0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "14px 20px",
                fontFamily: "'Nunito', sans-serif",
                fontSize: "1rem",
                fontWeight: isActive(link.path) ? 700 : 500,
                color: isActive(link.path) ? "#fff" : "rgba(255,255,255,0.65)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: isActive(link.path) ? "rgba(255,255,255,0.1)" : "transparent",
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/pilot-study"
            onClick={(e) => {
              setMobileOpen(false);
              if (location.pathname === '/') {
                e.preventDefault();
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="ripple-btn"
            style={{ margin: "12px", justifyContent: "center" }}
          >
            Join The Study
            <span className="animation" />
          </Link>
        </div>
      )}
    </>
  );
}
