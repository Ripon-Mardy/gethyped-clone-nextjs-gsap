"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experticeCards = [
  {
    id: 1,
    name: "Expertise",
    cardNumber: "01",
    title: "Social Strategy",
    subTitle: "Slimme strategie. Sterke start.",
    description:
      "We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die écht impact maken. Zo weet je precies waarom het werkt.",
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
    description:
      "We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek. Altijd met het doel voor ogen.",
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
    subTitle: "Zichtbaar waar en wanneer het telt.",
    description:
      "De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is. Zo raakt jouw merk de juiste mensen, precies waar en wanneer het telt.",
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
    description:
      "We duiken in de cijfers om te snappen wat écht werkt. En sturen jouw content scherp bij.",
    bgColor: "#138BFA",
    buttonText: "Meer over data",
    video: "/videos/expertise4.mp4",
    buttonBg: "#FFFFFF",
    buttonTextColor: "#000000",
  },
];

const StackedScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = sectionsRef.current;

      // ✅ initial state
      gsap.set(sections, { yPercent: 100 });
      gsap.set(sections[0], { yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${sections.length * 100}%`,
          scrub: 1,
          pin: true,
        },
      });

      // ✅ SAME animation applied for all
      sections.forEach((section, i) => {
        if (i === 0) return;

        tl.to(
          section,
          {
            yPercent: 0,
            ease: "power2.out",
          },
          i,
        );

        tl.to(
          sections[i - 1],
          {
            y: 100,
            scale: 0.95,
            opacity: 0.7,
            zIndex: -1,
            transformOrigin: "top center",
            ease: "power2.out",
          },
          i,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden container mx-auto"
    >
      {experticeCards.map((card, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          style={{
            backgroundColor: card.bgColor,
            zIndex: experticeCards.length - index,
          }}
          className="absolute inset-0 w-full h-screen flex items-center justify-between p-10"
        >
          {/* LEFT */}
          <div className="basis-2/3 h-full flex flex-col justify-between">
            <div className="space-y-7">
              <h4 className="bg-gray-300 p-2 w-fit rounded-md font-semibold">
                {card.name}
              </h4>
              <h2 className="text-7xl font-bold">{card.title}</h2>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">{card.subTitle}</h2>
              <p className="text-lg text-gray-700 w-1/2">{card.description}</p>

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
          <div>
            <h2 className="text-end text-8xl font-bold opacity-30">
              {card.cardNumber}
            </h2>

            <div className="relative w-72 h-[420px] ml-auto rounded-xl overflow-hidden rotate-3 bg-white">
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
  );
};

export default StackedScroll;
