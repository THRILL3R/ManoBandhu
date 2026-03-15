import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { NewHome } from "./pages/NewHome";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { BlogsPage } from "./pages/BlogsPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { PilotStudyPage } from "./pages/PilotStudyPage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfUse } from "./pages/TermsOfUse";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: NewHome },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "blogs", Component: BlogsPage },
      { path: "blogs/:id", Component: BlogPostPage },
      { path: "contact", Component: ContactPage },
      { path: "pilot-study", Component: PilotStudyPage },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "terms-of-use", Component: TermsOfUse },
    ],
  },
]);