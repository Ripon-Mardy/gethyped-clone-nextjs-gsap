"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// icons
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

// expertise json data
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

const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = sectionRef.current;

      // initial default state value
      gsap.set(sections, { yPercent: 100 });
      gsap.set(sections[0], { yPercent: 0 });

      // timeline 1
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${sections.length * 100}%`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: "labels",
            duration: { min: 0.3, max: 0.6 },
            delay: 0.2,
            ease: "power2.inOut",
          },
        }, // end scroll trigger
      }); //end first tl

      sections.forEach((section, index) => {
        if (index === 0) return;

        tl.add(`section-${index}`);

        tl.to(
          section,
          {
            yPercent: 0,
            ease: "power3.inOut",
          },
          index,
        ); //end second tl

        tl.to(
          sections[index - 1],
          {
            y: 180,
            scale: 0.9,
            opacity: 0.5,
            transformOrigin: "top center",
            ease: "power3.inOut",
          },
          index,
        );
      }); // end sections loop
    }, containerRef); // end gsap ctx context
    return () => ctx.revert();
  }, []); // end useEffect
  return (
    <div className="container mx-auto">
      <div ref={containerRef} className=" relative h-screen overflow-hidden">
        {experticeCards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) sectionRef.current[index] = el;
            }}
            style={{
              backgroundColor: card.bgColor,
              // zIndex: experticeCards.length - index,
            }}
            className="absolute inset-0 w-full h-screen flex items-center justify-between p-10 bg-[${card.bgColor}] rounded-4xl"
          >
            {/* left side  */}
            <div className="basis-2/3 h-full flex flex-col items-start justify-between gap-4">
              <div className="space-y-7">
                <h4 className="bg-gray-300 p-2 w-fit rounded-md text-center font-semibold text-base">
                  {card?.name || "Expertise"}
                </h4>
                <h2 className="text-7xl font-bold">{card?.title || "Title"}</h2>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">
                  {card?.subTitle || "Sub Title"}
                </h2>
                <p className="text-lg font-semibold text-gray-700 w-1/2">
                  {card?.description || "Description"}
                </p>
                <button
                  style={{
                    backgroundColor: card?.buttonBg,
                    color: card?.buttonTextColor,
                  }}
                  className=" py-2 px-4 rounded-md cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  {card?.buttonText || "Button Text"}
                  <span
                    className={`p-1 rounded-md ${index === 0 ? "bg-white text-black" : "bg-black text-white"} `}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>

            {/* right side  */}
            <div className=" rounded-4xl flex-end">
              <h2 className="text-end text-8xl font-bold opacity-30">
                {card?.cardNumber || "00"}
              </h2>
              <div
                className={`relative w-72 h-100 ml-auto rounded-xl overflow-hidden rotate-4 ${index === 0 ? "bg-[#F35226]" : "bg-white"} `}
              >
                <video
                  src={card?.video}
                  loop
                  autoPlay
                  muted
                  className="absolute left-0 top-0 w-full h-full p-2 object-cover rounded-2xl"
                ></video>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;
