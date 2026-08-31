"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Particles from "./particles";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const scrollingRef = useRef(false);
  const suppressUntilRef = useRef(0);

  // Ignores scroll-spy recomputation for a bit. Used both for our own scrollIntoView
  // animation and for the browser's native focus-follows-tab scrolling, which otherwise
  // flips activeSection to "home" (and unmounts the nav) the instant Tab/Shift+Tab focuses
  // an off-screen hero link, making the nav unreachable mid keyboard-navigation.
  const suppressScrollSpy = (durationMs = 600) => {
    scrollingRef.current = true;
    const until = Date.now() + durationMs;
    suppressUntilRef.current = until;
    window.setTimeout(() => {
      if (suppressUntilRef.current === until) {
        scrollingRef.current = false;
      }
    }, durationMs);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId); // Instantly highlight the nav
    suppressScrollSpy();
    const element = document.getElementById(sectionId);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    element?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    // Move focus into the destination section so keyboard/AT users land where the page
    // scrolled to, instead of being stranded on the (possibly now off-screen) control.
    const heading = document.getElementById(`${sectionId}-heading`);
    heading?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollingRef.current) return; // Ignore scroll events during animation

      const sections = ["home", "about", "work", "projects"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleFocusIn = () => suppressScrollSpy();

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  const heroButtonClass =
    "rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]";

  return (
    <div className="font-sans min-h-screen relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to main content
      </a>
      {/* Particles background */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      {/* Content */}
      <div className="relative z-10">
        {/* Fixed Navigation */}
        {activeSection !== "home" && (
          <nav
            className="fixed top-3 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 border border-white/15 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-lg max-w-[96vw] overflow-x-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-0.5 sm:gap-2 w-max">
              {navLinks.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  aria-current={activeSection === id ? "true" : undefined}
                  className={`shrink-0 rounded-full transition-all duration-300 flex items-center justify-center font-medium text-xs sm:text-sm h-7 sm:h-8 px-2.5 sm:px-4 ${
                    activeSection === id
                      ? "bg-black text-white"
                      : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}

        <main id="main-content" tabIndex={-1}>
          {/* Home Section */}
          <section
            id="home"
            aria-labelledby="home-heading"
            className="min-h-screen scroll-mt-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 gap-4 sm:gap-8"
          >
            <div className="flex flex-col gap-4 sm:gap-6 row-start-2 items-center">
              <h1
                id="home-heading"
                tabIndex={-1}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-center w-full"
              >
                Harry <span className="text-primary">Heckmann</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center w-full">
                Software Engineer
              </h2>
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                  className={heroButtonClass}
                >
                  About
                </a>
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("work");
                  }}
                  className={heroButtonClass}
                >
                  Work
                </a>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                  className={heroButtonClass}
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className={heroButtonClass}
                >
                  Contact
                </a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            aria-labelledby="about-heading"
            className="min-h-screen scroll-mt-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 py-16 sm:py-8"
          >
            <div className="row-start-2 w-full max-w-5xl mx-auto">
              <div className="w-full bg-white/5 rounded-xl px-8 py-8 shadow-lg flex flex-col">
                <h2
                  id="about-heading"
                  tabIndex={-1}
                  className="text-4xl sm:text-5xl font-bold tracking-tight text-left w-full mb-6"
                >
                  Who I Am
                </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 items-center">
                  <div className="flex justify-center items-center">
                    <Image
                      src="/heckmann-23.jpg"
                      alt="Harry and his son"
                      width={300}
                      height={300}
                      className="rounded-xl object-cover w-[300px] h-[300px]"
                    />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-medium tracking-tight text-left leading-relaxed">
                      Former music educator turned developer based in the DFW area. After
                      realizing the classroom wasn't quite the right stage, I transitioned
                      into tech—starting in support, moving through project management,
                      and eventually finding my home in web development. Over the past 10
                      years, I've built a career around creating intuitive, high-performing
                      digital experiences, collaborating with cross-functional teams, and
                      mentoring developers along the way. I'm passionate about the
                      intersection of design and engineering—the part where creative vision
                      meets clean, scalable code. Let's build something great together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Work Section */}
          <section
            id="work"
            aria-labelledby="work-heading"
            className="min-h-screen scroll-mt-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 py-16 sm:py-8 gap-4 sm:gap-8"
          >
            <div className="flex flex-col gap-10 row-start-2 items-center w-full max-w-5xl mx-auto">
              {/* Who I've worked with */}
              <div className="w-full bg-white/5 rounded-xl p-6 shadow-lg flex flex-col sm:flex-row gap-8 items-start">
                {/* Text column */}
                <div className="flex-1">
                  <h2
                    id="work-heading"
                    tabIndex={-1}
                    className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-left"
                  >
                    Who I've worked with
                  </h2>
                  <p className="text-lg sm:text-xl font-medium tracking-tight text-left leading-relaxed max-w-3xl">
                    Over the past decade, I’ve built and led frontend and fullstack
                    solutions for a wide range of organizations—from major corporations
                    like Capital One, Southwest Airlines, and AT&T, to agile teams at
                    Amdocs Studios and fintech startups like LeafHouse Financial.
                  </p>
                </div>
                {/* Logos grid */}
                <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
                  <Image
                    src="/att.png"
                    alt="AT&T Logo"
                    width={80}
                    height={80}
                    className="object-contain h-20 w-20"
                    priority
                  />
                  <Image
                    src="/amdocs-.png"
                    alt="Amdocs Logo"
                    width={80}
                    height={80}
                    className="object-contain h-20 w-20"
                  />
                  <Image
                    src="/southwest.png"
                    alt="Southwest Logo"
                    width={100}
                    height={100}
                    className="object-contain h-24 w-24"
                  />
                  <Image
                    src="/leafhouse.png"
                    alt="Leafhouse Logo"
                    width={100}
                    height={100}
                    className="object-contain h-24 w-24"
                  />
                  <Image
                    src="/c1_white_red.png"
                    alt="Capital One Logo"
                    width={80}
                    height={80}
                    className="object-contain h-20 w-20"
                  />
                  <Image
                    src="/aspire.svg"
                    alt="AspireHR Logo"
                    width={80}
                    height={80}
                    className="object-contain h-20 w-20"
                  />
                </div>
              </div>

              {/* What I Do */}
              <div className="w-full bg-white/5 rounded-xl p-6 shadow-lg flex flex-col sm:flex-row gap-8 items-start">
                {/* Text column */}
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-left">
                    What I Do
                  </h2>
                  <p className="text-lg sm:text-xl font-medium tracking-tight text-left leading-relaxed max-w-3xl">
                    My work has spanned designing modern UI systems, developing scalable
                    component libraries, optimizing legacy codebases, and collaborating
                    across disciplines to ship responsive, user-focused applications.
                    Whether launching internal platforms for auto loans or revamping
                    customer-facing experiences, I’ve consistently delivered clean,
                    performant code that bridges the gap between design and development.
                  </p>
                </div>
                {/* Icons grid */}
                <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
                  <i className="devicon-nextjs-original-wordmark text-4xl" />
                  <i className="devicon-react-original-wordmark text-4xl" />
                  <i className="devicon-amazonwebservices-plain-wordmark text-4xl" />
                  <i className="devicon-typescript-plain text-4xl" />
                  <i className="devicon-javascript-plain text-4xl" />
                  <i className="devicon-sass-original text-4xl" />
                  <i className="devicon-angular-plain-wordmark text-4xl" />
                  <i className="devicon-nodejs-plain-wordmark text-4xl" />
                  <i className="devicon-git-plain-wordmark text-4xl" />
                  <i className="devicon-html5-plain-wordmark text-4xl" />
                  <i className="devicon-css3-plain-wordmark text-4xl" />
                  <i className="devicon-postgresql-plain-wordmark text-4xl" />
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            aria-labelledby="projects-heading"
            className="min-h-screen scroll-mt-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 py-16 sm:py-8 gap-4 sm:gap-8"
          >
            <div className="flex flex-col gap-6 row-start-2 items-center w-full max-w-5xl mx-auto py-8">
              <h2
                id="projects-heading"
                tabIndex={-1}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-center sm:text-left w-full"
              >
                Projects
              </h2>
              <div className="w-full bg-white/5 rounded-xl p-6 shadow-lg flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-left">
                      Flux Barge-In
                    </h3>
                    <p className="text-base sm:text-lg font-medium text-left text-white/60 mt-1">
                      A full-duplex voice agent built on Deepgram Flux STT + TTS
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href="https://heckmann-tts.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-solid border-white/[.145] bg-white/10 transition-colors flex items-center gap-2 hover:bg-white/20 hover:border-transparent font-medium text-sm h-10 px-4"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Try it live
                    </a>
                    <a
                      href="https://github.com/HarryHeckmann/heckmann-tts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-solid border-white/[.145] transition-colors flex items-center gap-2 hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm h-10 px-4"
                    >
                      <i className="devicon-github-original text-lg" />
                      View code
                    </a>
                  </div>
                </div>

                <p className="text-lg sm:text-xl font-medium tracking-tight text-left leading-relaxed">
                  Most voice-agent demos stop at &ldquo;text-to-speech works.&rdquo; This one is built
                  around the part Deepgram Flux is actually designed to solve: what happens to the
                  conversation when a user talks over the agent mid-sentence. Interrupting the agent
                  doesn&apos;t just stop the audio — it reconciles the transcript so the model only ever
                  remembers the words the user actually heard, not the sentence it was cut off from
                  saying.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-left mb-1">Barge-in with a real playback clock</h4>
                    <p className="text-sm text-white/70 text-left leading-relaxed">
                      Flux TTS streams faster than real time, so interrupting is timed against
                      rendered audio frames, not the send clock — otherwise history records words
                      the user never heard.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-left mb-1">Live voice &amp; turn-taking control</h4>
                    <p className="text-sm text-white/70 text-left leading-relaxed">
                      36 Flux TTS voices, switched live mid-conversation, plus end-of-turn confidence
                      and silence timeout tuned in real time via streaming Configure messages.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-left mb-1">Voice interview practice mode</h4>
                    <p className="text-sm text-white/70 text-left leading-relaxed">
                      Asks real questions out loud from a rubric-graded question bank and follows up
                      on what your answer actually missed, entirely hands-free.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-left mb-1">Resilient by design</h4>
                    <p className="text-sm text-white/70 text-left leading-relaxed">
                      Session resumption survives a dropped socket, and the whole pipeline degrades
                      gracefully to a scripted responder with no LLM key at all.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-start">
                  {[
                    "Deepgram Flux STT/TTS",
                    "Claude",
                    "WebSocket",
                    "TypeScript",
                    "React",
                    "Node.js",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs sm:text-sm font-medium tracking-tight rounded-full border border-white/15 px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            aria-labelledby="contact-heading"
            className="min-h-screen scroll-mt-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 py-16 sm:py-8 gap-4 sm:gap-8"
          >
            <div className="flex flex-col row-start-2 items-center w-full max-w-2xl mx-auto">
              <h2
                id="contact-heading"
                tabIndex={-1}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-center w-full mb-2"
              >
                Contact
              </h2>
              <p className="text-lg sm:text-xl font-medium tracking-tight text-center leading-relaxed max-w-md w-full mb-4">
                Want to connect, collaborate, or just say hi? Reach out via any of the links below!
              </p>
              <div className="w-full max-w-lg bg-white/5 rounded-xl p-6 shadow-lg flex flex-wrap justify-center gap-8 mt-2">
                <a
                  href="https://github.com/HarryHeckmann"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (opens in a new tab)"
                  className="flex items-center gap-2 text-base font-medium transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
                >
                  <i className="devicon-github-original text-3xl" aria-hidden="true" />
                  <span className="hover:underline">GitHub</span>
                </a>
                <a
                  href="mailto:heckmann.harry@gmail.com"
                  className="flex items-center gap-2 text-base font-medium transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
                >
                  <svg width="24" height="24" fill="currentColor" className="text-2xl" aria-hidden="true"><path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v.01L12 13l8-8.99V4H4zm16 2.41l-7.59 7.59a2 2 0 01-2.82 0L4 6.41V20h16V6.41z"/></svg>
                  <span className="hover:underline">Email</span>
                </a>
                <a
                  href="https://linkedin.com/in/harry-heckmann/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (opens in a new tab)"
                  className="flex items-center gap-2 text-base font-medium transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
                >
                  <i className="devicon-linkedin-plain text-3xl" aria-hidden="true" />
                  <span className="hover:underline">LinkedIn</span>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
