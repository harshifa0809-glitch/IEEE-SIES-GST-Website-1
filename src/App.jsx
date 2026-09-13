import ScrollManager from "./components/ScrollManager";
import LoadingScreen from "./components/LoadingScreen";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./index.css";

import { teamLoader } from "./loaders/teamLoader";

// Lazy-loaded components
const Teams = lazy(() => import("./components/Teams"));

const AboutUs = lazy(() => import("./pages/AboutUs"));
const TechCore = lazy(() => import("./pages/TechCore"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
const YouTubeShowcase = lazy(() => import("./components/YouTubeShowcase"));
const Contact = lazy(() => import("./pages/Contact"));
const Hero = lazy(() => import("./components/Hero"));
const FAQ = lazy(() => import("./pages/FAQ"));
const EnhancedBackground = lazy(() => import("./components/BackgroundEffects"));

/* =========================================================
   HOME PAGE — the original "/" content, pulled into its own
   component so it can be a child route of RootLayout.
========================================================= */

function HomePage() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* ABOUT IEEE SIES GST */}
      <AboutUs />

      {/* 3D TECHNOLOGY CORE */}
      <TechCore />

      {/* EVENTS */}
      <Events />

      {/* GALLERY */}
      <Gallery />

      {/* YOUTUBE SHOWCASE */}
      <YouTubeShowcase />

      {/* FAQ */}
      <FAQ />

      {/* CONTACT */}
      <Contact />
    </>
  );
}

/* =========================================================
   ROOT LAYOUT — wraps every route with the shared chrome
   (scroll manager, background) AND animates between routes
   via AnimatePresence keyed on the pathname, so switching
   between "/" and "/team" fades/slides instead of jumping.
========================================================= */

function RootLayout() {
  const location = useLocation();

  return (
    <>
      <ScrollManager />
      <EnhancedBackground />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "team", element: <Teams />, loader: teamLoader },
    ],
  },

  // Redirect old Junior Council route
  {
    path: "/junior-council",
    element: <Navigate to="/team" replace />,
  },
]);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-[9999]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application */}
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}
