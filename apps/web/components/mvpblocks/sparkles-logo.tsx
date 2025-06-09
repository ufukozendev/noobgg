import { SparklesCore } from "@/components/ui/sparkles";

import Image from "next/image";

export default function SparklesLogo() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="mx-auto mt-10 w-screen max-w-full md:max-w-4xl">
        <div className="text-center text-3xl text-white">
          <span className="text-[#6f52f4]">
            Pick Your Game. Find Your People.
          </span>
        </div>

        <div className="mt-10 grid grid-cols-5 gap-10 items-center px-4 lg:px-0">
          <Image
            src="/logos/valorant-logo.svg"
            alt="Valorant Logo"
            width={220}
            height={70}
            className="w-full"
          />
          <Image
            src="/logos/league-of-legends-logo.svg"
            alt="League of Legends Logo"
            width={220}
            height={70}
            className="w-full"
          />
          <Image
            src="/logos/fortnite-logo.svg"
            alt="Fortnite"
            width={220}
            height={70}
            className="w-full"
          />
          <Image
            src="/logos/pubg-logo.webp"
            alt="PlayerUnknown's Battlegrounds"
            width={220}
            height={70}
            className="w-full color-amber-50"
          />

          <Image
            src="/logos/counter-strike-2.svg"
            alt="Counter Strike 2"
            width={220}
            height={70}
            className="w-full"
          />
        </div>
      </div>

      <div className="relative -mt-32 h-96 w-screen max-w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#6f52f4,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#9b87f5] after:bg-zinc-900">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          particleDensity={300}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </div>
  );
}
