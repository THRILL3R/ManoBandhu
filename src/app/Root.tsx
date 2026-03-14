import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { NewNavbar } from "./components/NewNavbar";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export function Root() {
  const { pathname } = useLocation();

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <NewNavbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}