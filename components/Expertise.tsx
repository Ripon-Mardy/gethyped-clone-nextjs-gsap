"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// DATA
const experticeCards = [
  {
    id: 1,
    name: "Expertise",
    cardNumber: "01",
    title: "Social Strategy",
    subTitle: "Slimme strategie. Sterke start.",
    description: "We duiken diep in jouw merk, doelgroep en doelen.",
    bgColor: "#FFFFFF",
    buttonText: "Meer over social strategie",
    video: "/videos/expertise1.mp4",
    buttonBg: "#F35226",
    buttonTextColor: "#FFFFFF",
  },
  {
    id: 2,
    name: "Expertise",
    cardNumber: "02",
    title: "Content Creation",
    subTitle: "Content die opvalt en raakt.",
    description: "We maken content die opvalt en blijft hangen.",
    bgColor: "#F2B7FA",
    buttonText: "Meer over content creatie",
    video: "/videos/expertise2.mp4",
    buttonBg: "#FFFFFF",
    buttonTextColor: "#000000",
  },
  {
    id: 3,
    name: "Expertise",
    cardNumber: "03",
    title: "Activation",
    subTitle: "Zichtbaar waar het telt.",
    description: "We verspreiden content waar jouw doelgroep is.",
    bgColor: "#57C892",
    buttonText: "Meer over activatie",
    video: "/videos/expertise3.mp4",
    buttonBg: "#FFFFFF",
    buttonTextColor: "#000000",
  },
  {
    id: 4,
    name: "Expertise",
    cardNumber: "04",
    title: "Data",
    subTitle: "Inzichten die impact maken.",
    description: "We analyseren wat werkt en sturen bij.",
    bgColor: "#138BFA",
    buttonText: "Meer over data",
    video: "/videos/expertise4.mp4",
    buttonBg: "#FFFFFF",
    buttonTextColor: "#000000",
  },
];

const Expertise = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const sections = sectionRef.current;

      // initial state
      gsap.set(sections, { yPercent: 100 });
      gsap.set(sections[0], { yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${sections.length * 100}%`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      sections.forEach((section, index) => {
        if (index === 0) return;

        // next comes up
        tl.to(
          section,
          {
            yPercent: 0,
            ease: "power3.inOut",
          },
          index,
        );

        // previous goes down
        tl.to(
          sections[index - 1],
          {
            y: 120,
            scale: 0.9,
            opacity: 0.5,
            transformOrigin: "top center",
            ease: "power3.inOut",
          },
          index,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div
        ref={containerRef}
        className="relative md:h-screen overflow-hidden space-y-5 md:space-y-0"
      >
        {experticeCards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) sectionRef.current[index] = el;
            }}
            style={{ backgroundColor: card.bgColor }}
            className="
              w-full 
              h-auto md:h-screen 
              flex flex-col md:flex-row 
              items-start md:items-center 
              justify-between 
              gap-6
              p-5 md:p-10 
              rounded-4xl

              relative md:absolute md:inset-0
            "
          >
            {/* LEFT */}
            <div className="md:basis-2/3 flex flex-col justify-between gap-6">
              <div className="space-y-4 md:space-y-7">
                <h4 className="bg-gray-300 p-2 w-fit rounded-md font-semibold text-sm">
                  {card.name}
                </h4>
                <h2 className="text-3xl md:text-7xl font-bold">{card.title}</h2>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {card.subTitle}
                </h3>
                <p className="text-base md:text-lg text-gray-700 md:w-1/2">
                  {card.description}
                </p>

                <button
                  style={{
                    backgroundColor: card.buttonBg,
                    color: card.buttonTextColor,
                  }}
                  className="py-2 px-4 rounded-md flex items-center gap-2 text-sm font-semibold"
                >
                  {card.buttonText}
                  <span className="p-1 rounded-md bg-black text-white">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-4 w-full md:w-auto">
              <h2 className="text-4xl md:text-8xl font-bold opacity-30">
                {card.cardNumber}
              </h2>

              <div className="relative w-40 h-40 md:w-72 md:h-[420px] rounded-xl overflow-hidden rotate-3 bg-white">
                <video
                  src={card.video}
                  loop
                  autoPlay
                  muted
                  className="absolute inset-0 w-full h-full object-cover p-2 rounded-2xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;
