import { useEffect } from "react";
import Lenis from "lenis";

export default function ScrollManager() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3D Enhancement: Velocity & Progress Tracking
    const handleScroll = () => {
      const velocity = lenis.velocity;
      const tiltAngle = Math.max(-3, Math.min(3, velocity * 0.15));
      const scrollProgress = lenis.limit > 0 ? lenis.scroll / lenis.limit : 0;

      document.documentElement.style.setProperty(
        "--scroll-tilt",
        `${tiltAngle}deg`,
      );
      document.documentElement.style.setProperty(
        "--scroll-progress",
        scrollProgress.toFixed(4),
      );
      document.documentElement.style.setProperty(
        "--is-scrolling",
        Math.abs(velocity) > 0.5 ? "1" : "0",
      );
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      document.documentElement.style.removeProperty("--scroll-tilt");
      document.documentElement.style.removeProperty("--scroll-progress");
      document.documentElement.style.removeProperty("--is-scrolling");
    };
  }, []);

  return null;
}
