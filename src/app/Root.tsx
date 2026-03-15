import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { NewNavbar } from "./components/NewNavbar";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export function Root() {
  const { pathname, hash } = useLocation();

  // Handle scrolling on navigation
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen">
      <NewNavbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}