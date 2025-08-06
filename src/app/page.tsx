"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Particles from "./particles";


export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const scrollingRef = useRef(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId); // Instantly highlight the nav
    scrollingRef.current = true;
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      scrollingRef.current = false;
    }, 600); // 600ms matches most smooth scroll durations
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollingRef.current) return; // Ignore scroll events during animation

      const sections = ["home", "about", "work"];
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans min-h-screen relative">
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
          <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 border border-white/15 rounded-full px-4 py-2 shadow-lg">
            <div className="flex gap-2">
              <button
                onClick={() => scrollToSection("home")}
                className={`rounded-full transition-all duration-300 flex items-center justify-center font-medium text-sm h-8 px-4 ${
                  activeSection === "home"
                    ? "bg-black text-white"
                    : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`rounded-full transition-all duration-300 flex items-center justify-center font-medium text-sm h-8 px-4 ${
                  activeSection === "about"
                    ? "bg-black text-white"
                    : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className={`rounded-full transition-all duration-300 flex items-center justify-center font-medium text-sm h-8 px-4 ${
                  activeSection === "work"
                    ? "bg-black text-white"
                    : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                }`}
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`rounded-full transition-all duration-300 flex items-center justify-center font-medium text-sm h-8 px-4 ${
                  activeSection === "contact"
                    ? "bg-black text-white"
                    : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                }`}
              >
                Contact
              </button>
            </div>
          </nav>
        )}

        {/* Home Section */}
        <section
          id="home"
          className="h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 gap-4 sm:gap-8"
        >
          <main className="flex flex-col gap-4 sm:gap-6 row-start-2 items-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center w-full">
              Harry <span className="text-primary">Heckmann</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center w-full">
              Software Engineer
            </h2>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <button
                onClick={() => scrollToSection("about")}
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              >
                Contact
              </button>
            </div>
          </main>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8"
        >
          <main className="row-start-2 w-full max-w-5xl mx-auto">
            <div className="w-full bg-white/5 rounded-xl px-8 py-8 shadow-lg flex flex-col">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-left w-full mb-6">
                Who I Am
              </h1>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6 items-center">
                <div className="flex justify-center items-center">
                  <Image
                    aria-hidden
                    src="/heckmann-23.jpg"
                    alt="Harry and his son"
                    width={300}
                    height={300}
                    className="rounded-xl object-cover w-[300px] h-[300px]"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-left leading-relaxed">
                    Former music educator turned developer based in the DFW area. After
                    realizing the classroom wasn't quite the right stage, I transitioned
                    into tech—starting in support, moving through project management,
                    and eventually finding my home in web development. Over the past 10
                    years, I've built a career around creating intuitive, high-performing
                    digital experiences, collaborating with cross-functional teams, and
                    mentoring developers along the way. I'm passionate about the
                    intersection of design and engineering—the part where creative vision
                    meets clean, scalable code. Let's build something great together.
                  </h3>
                </div>
              </div>
            </div>
          </main>
        </section>

        {/* Work Section */}
        <section
          id="work"
          className="h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 gap-4 sm:gap-8"
        >
          <main className="flex flex-col gap-10 row-start-2 items-center w-full max-w-5xl mx-auto">
            {/* Who I've worked with */}
            <div className="w-full bg-white/5 rounded-xl p-6 shadow-lg flex flex-col sm:flex-row gap-8 items-start">
              {/* Text column */}
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-left">
                  Who I've worked with
                </h1>
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
          </main>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 gap-4 sm:gap-8"
        >
          <main className="flex flex-col row-start-2 items-center w-full max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center w-full mb-2">
              Contact
            </h1>
            <p className="text-lg sm:text-xl font-medium tracking-tight text-center leading-relaxed max-w-md w-full mb-4">
              Want to connect, collaborate, or just say hi? Reach out via any of the links below!
            </p>
            <div className="w-full max-w-lg bg-white/5 rounded-xl p-6 shadow-lg flex flex-wrap justify-center gap-8 mt-2">
              <a
                href="https://github.com/HarryHeckmann"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-medium transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
              >
                <i className="devicon-github-original text-3xl" />
                <span className="hover:underline">GitHub</span>
              </a>
              <a
                href="mailto:heckmann.harry@gmail.com"
                className="flex items-center gap-2 text-base font-medium transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
              >
                <svg width="24" height="24" fill="currentColor" className="text-2xl"><path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v.01L12 13l8-8.99V4H4zm16 2.41l-7.59 7.59a2 2 0 01-2.82 0L4 6.41V20h16V6.41z"/></svg>
                <span className="hover:underline">Email</span>
              </a>
              <a
                href="https://linkedin.com/in/harry-heckmann/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-medium transition-colors hover:bg-white/10 px-4 py-2 rounded-lg"
              >
                <i className="devicon-linkedin-plain text-3xl" />
                <span className="hover:underline">LinkedIn</span>
              </a>
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}
