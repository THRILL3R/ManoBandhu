import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { NewHome } from "./pages/NewHome";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { BlogsPage } from "./pages/BlogsPage";
import { EventsPage } from "./pages/EventsPage";
import { ContactPage } from "./pages/ContactPage";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: NewHome },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "blogs", Component: BlogsPage },
      { path: "events", Component: EventsPage },
      { path: "events/dashboard", Component: OrganizerDashboard },
      { path: "contact", Component: ContactPage },
    ],
  },
]);