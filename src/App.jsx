import ScrollManager from "./components/ScrollManager";
import LoadingScreen from "./components/LoadingScreen";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
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

// Layout
const Layout = ({ children }) => {
  return (
    <>
      <ScrollManager />
      <EnhancedBackground />
      {children}
    </>
  );
};

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
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
      </Layout>
    ),
  },

  // TEAM PAGE
  {
    path: "/team",
    element: (
      <Layout>
        <Teams />
      </Layout>
    ),
    loader: teamLoader,
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
