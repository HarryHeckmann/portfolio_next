"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Moves focus to the new page's h1 and announces the title change on client-side
// navigation, since Next's App Router doesn't manage focus for route changes on its own.
const RouteAnnouncer = () => {
  const pathname = usePathname();
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const heading = document.querySelector("main h1") as HTMLElement | null;
    if (heading) {
      if (!heading.hasAttribute("tabindex")) {
        heading.setAttribute("tabindex", "-1");
      }
      heading.focus();
    }

    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = document.title;
    }
  }, [pathname]);

  return (
    <div ref={liveRegionRef} role="status" aria-live="polite" className="sr-only" />
  );
};

export default RouteAnnouncer;
