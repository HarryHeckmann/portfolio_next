import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const About = () => (
  <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-4 sm:p-8 gap-4 sm:gap-8 overflow-hidden">  
    <main className="flex flex-col gap-4 sm:gap-6 row-start-2 items-center sm:items-start max-h-full overflow-y-auto">



        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center sm:text-left">
          Who I Am
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 w-full items-center">
            <div className="grid grid-cols-1 gap-4 justify-center sm:justify-start items-center w-[375px] h-[375px]">
                <Image
                    aria-hidden
                    src="/harry_jude.jpg"
                    alt="Harry and his son"
                    width={2007}
                    height={2432}
                    className="rounded-xl object-cover flex-shrink-0 w-[375px] h-[375px]"
                />
            </div>
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-center sm:text-left max-w-xl leading-relaxed">
                Former music educator turned developer based in the DFW area. After realizing the classroom wasn't quite the right stage, I transitioned into tech—starting in support, moving through project management, and eventually finding my home in web development. Over the past 10 years, I've built a career around creating intuitive, high-performing digital experiences, collaborating with cross-functional teams, and mentoring developers along the way. I'm passionate about the intersection of design and engineering—the part where creative vision meets clean, scalable code. Let's build something great together.
            </h3>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">

            <Link
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="/"
            >
              Home
            </Link>
            <Link
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="/work"
            >
              Work
            </Link>
        </div>
      </main>
</div>
);

export default About;