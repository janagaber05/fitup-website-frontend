import { createBrowserRouter } from "react-router-dom";
import FitupLanding from "./pages/FitupLanding";
import AppExperiencePage from "./pages/AppExperiencePage";
import FeatureDetail from "./pages/FeatureDetail";
import FitupProcessPage from "./pages/FitupProcessPage";
import ForGymsPage from "./pages/ForGymsPage";
import FitupLayout from "./components/FitupLayout";
import PlatformPage from "./pages/PlatformPage";
import ContactPage from "./pages/ContactPage";
import JoinUsPage from "./pages/JoinUsPage";
import SecurityPage from "./pages/SecurityPage";
import AboutPage from "./pages/AboutPage";
import PartnerPage from "./pages/PartnerPage";
import ProfilePage from "./pages/ProfilePage";
import SolutionDetailPage from "./pages/SolutionDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FitupLayout />,
    children: [
      {
        index: true,
        element: <FitupLanding />,
      },
      {
        path: "landing",
        element: <FitupLanding />,
      },
      {
        path: "app-experience",
        element: <AppExperiencePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "partner",
        element: <PartnerPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "security",
        element: <SecurityPage />,
      },
      {
        path: "join-us",
        element: <JoinUsPage />,
      },
      {
        path: "platform",
        element: <PlatformPage />,
      },
      {
        path: "how-it-works",
        element: <FitupProcessPage />,
      },
      {
        path: "feature/:featureId",
        element: <FeatureDetail />,
      },
      {
        path: "for-gyms",
        element: <ForGymsPage />,
      },
      {
        path: "solution/:cardId",
        element: <SolutionDetailPage />,
      },
    ],
  },
]);

export default router;
