import { Link } from "react-router";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden py-16"
      style={{
        backgroundColor: "#06221c", // Dark green shade matching the site
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 flex items-center justify-center">
              <img src="/mb-white-logo.png" alt="ManoBandhu Logo" className="w-full h-full object-contain" />
            </div>
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ManoBandhu
            </span>
          </div>
          <p className="text-sm text-[#8fa8a1] leading-relaxed max-w-[280px]">
            © copyright ManoBandhu 2026.<br />All rights reserved.
          </p>
        </div>

        {/* Links Grid */}
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Pages */}
          <div>
            <h4 className="font-bold text-base mb-5 tracking-wide text-white">Pages</h4>
            <ul className="space-y-4 text-[15px] font-medium text-[#c4d6cf]">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/studio" className="hover:text-white transition-colors">Studio</Link></li>
              <li><Link to="/clients" className="hover:text-white transition-colors">Clients</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/blogs" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-bold text-base mb-5 tracking-wide text-white">Socials</h4>
            <ul className="space-y-4 text-[15px] font-medium text-[#c4d6cf]">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-base mb-5 tracking-wide text-white">Legal</h4>
            <ul className="space-y-4 text-[15px] font-medium text-[#c4d6cf]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Register */}
          <div>
            <h4 className="font-bold text-base mb-5 tracking-wide text-white">Register</h4>
            <ul className="space-y-4 text-[15px] font-medium text-[#c4d6cf]">
              <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/forgot-password" className="hover:text-white transition-colors">Forgot Password</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Giant Watermark Text */}
      <div
        className="absolute bottom-[-10%] left-0 w-full text-center pointer-events-none select-none flex justify-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(60px, 15vw, 240px)",
          fontWeight: 900,
          lineHeight: 0.8,
          color: "rgba(255, 255, 255, 0.03)",
          letterSpacing: "-0.02em",
          transform: "translateY(15%)", /* pulls text up so it overlaps bottom */
          whiteSpace: "nowrap",
        }}
        aria-hidden="true"
      >
        ManoBandhu
      </div>
    </footer>
  );
}