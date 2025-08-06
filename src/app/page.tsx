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
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md border border-black/[.08] dark:border-white/[.145] rounded-full px-4 py-2">
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
          </div>
        </nav>

        {/* Home Section */}
        <section
          id="home"
          className="h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 gap-4 sm:gap-8"
        >
          <main className="flex flex-col gap-4 sm:gap-6 row-start-2 items-center sm:items-start">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center sm:text-left">
              Harry <span className="text-primary">Heckmann</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center sm:text-left">
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
            </div>
          </main>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 gap-4 sm:gap-8"
        >
          <main className="flex flex-col gap-4 sm:gap-6 row-start-2 items-center sm:items-start">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center sm:text-left">
              Who I Am
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 w-full items-center">
              <div className="grid grid-cols-1 gap-4 justify-center sm:justify-start items-center w-[300px] h-[300px]">
                <Image
                  aria-hidden
                  src="/heckmann-23.jpg"
                  alt="Harry and his son"
                  width={300}
                  height={300}
                  className="rounded-xl object-cover flex-shrink-0 w-[300px] h-[300px]"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-center sm:text-left max-w-xl leading-relaxed">
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
            {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
              <button
                onClick={() => scrollToSection("home")}
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              >
                Home
              </button>
            </div> */}
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
      </div>
    </div>
  );
}
