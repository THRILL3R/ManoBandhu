import { Outlet } from "react-router";
import { NewNavbar } from "./components/NewNavbar";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export function Root() {
  return (
    <div className="min-h-screen">
      <NewNavbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}