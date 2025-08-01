import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Work = () => (

        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-4 sm:p-8 gap-4 sm:gap-8 overflow-hidden">  
        
        


      <main className="flex flex-col gap-4 sm:gap-6 row-start-2 items-center sm:items-start max-h-full overflow-y-auto">



        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center sm:text-left">
          What I've Done
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 w-full items-center">
            <div className="grid grid-cols-2 gap-4 justify-center sm:justify-start items-center w-[375px] h-[375px]">
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
                    width={80}
                    height={80}
                    className="object-contain h-20 w-20"
                />
                <Image
                    src="/leafhouse.png"
                    alt="Leafhouse Logo"
                    width={80}
                    height={80}
                    className="object-contain h-20 w-20"
                />
                <Image
                    src="/capital_one.png"
                    alt="Capital One Logo"
                    width={80}
                    height={80}
                    className="object-contain h-20 w-20"
                />
            </div>
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-center sm:text-left max-w-xl leading-relaxed">
                Over the past decade, I’ve built and led frontend and fullstack solutions for a wide range of organizations—from major corporations like Capital One, Southwest Airlines, and AT&T, to agile teams at Stellar Elements and fintech startups like LeafHouse Financial. My work has spanned designing modern UI systems, developing scalable component libraries, optimizing legacy codebases, and collaborating across disciplines to ship responsive, user-focused applications. Whether launching internal platforms for auto loans or revamping customer-facing experiences, I’ve consistently delivered clean, performant code that bridges the gap between design and development.
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
              href="/about"
            >
              About
            </Link>

        </div>
      </main>
</div>
);

export default Work;