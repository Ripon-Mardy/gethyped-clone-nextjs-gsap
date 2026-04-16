"use client";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";

// images
import image1 from "@/public/image1.webp";

// icons
import { ArrowRight, ArrowDown } from "lucide-react";
import { buffer } from "stream/consumers";

const cards = [
  {
    id: 1,
    type: "text",
    title: "10M+",
    bgColor: "#138BFA",
    subTitle: "Organische views",
    text: "Groei door slimme content",
  },
  {
    id: 2,
    type: "video",
    video: "/videos/frame1.mp4",
  },
  {
    id: 3,
    type: "text",
    title: "30+",
    bgColor: "#57C892",
    subTitle: "Merken geholpen",
    text: "Van start-up tot multinational",
  },
  {
    id: 4,
    type: "video",
    video: "/videos/frame2.mp4",
  },
];

const Hero = () => {
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const leerButtonRef = useRef<HTMLButtonElement>(null);

  // arrow icons
  const topIconRef = useRef<HTMLDivElement>(null);
  const bottomIconRef = useRef<HTMLDivElement>(null);

  // handle mouse enter on card
  const handleMouseEnter = (index: number) => {
    cardRef.current.forEach((card, i) => {
      if (!card) return;
      console.log("i", i);

      if (i === index) {
        gsap.to(card, {
          scale: 1.1,
          rotation: 0,
          duration: 0.3,
          ease: "power1.inOut",
        });
      } else if (i < index) {
        gsap.to(card, {
          x: -50,
          scale: 0.95,
          duration: 0.3,
          ease: "power1.inOut",
        });
      } else {
        gsap.to(card, {
          x: 50,
          scale: 0.95,
          duration: 0.3,
          ease: "power1.inOut",
        });
      }
    });
  };

  // handle mouse leave
  const handleMouseLeave = () => {
    cardRef.current.forEach((card) => {
      if (!card) return;

      gsap.to(card, {
        x: 0,
        scale: 1,
        duration: 0.3,
        rotation: 5,
        ease: "expo.inOut",
      });
    });
  };

  // handle leer button mouse enter
  const handleLeerbuttonMouseEnter = () => {
    if (!leerButtonRef.current) return;

    gsap.to(leerButtonRef.current, {
      rotation: -7,
      borderRadius: "10px",
      duration: 0.3,
      scale: 1.1,
      ease: "power1.inOut",
    });
  };

  const handleLeerbuttonMouseLeave = () => {
    // if (!leerButtonRef.current) return;

    gsap.to(leerButtonRef.current, {
      borderRadius: "10px",
      rotation: 0,
      duration: 0.3,
      scale: 1,
      ease: "power1.inOut",
    });
  };

  // arrow down button animation
  const handleArrowMouseEnter = () => {
    if (!topIconRef.current) return;

    gsap.to(topIconRef.current, {
      y: 40,
      duration: 0.3,
      ease: "power1.inOut",
    });

    gsap.fromTo(
      bottomIconRef.current,
      {
        y: -40,
      },
      {
        y: 0,
        duration: 0.3,
        ease: "power1.inOut",
      },
    );
  };

  const handleArrowMouseLeave = () => {
    if (!topIconRef.current) return;

    gsap.to(bottomIconRef.current, {
      y: -40,
      duration: 0.3,
      ease: "power1.inOut",
    });

    gsap.to(topIconRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <div className="container mx-auto py-12">
      <div className="space-y-8">
        <p className="text-8xl font-bold">
          Get Hyped. Get <br /> Noticed. Get Results.
        </p>
        <p className="text-2xl font-semibold">
          Klaar met gokken op content <br /> die niets oplevert?
        </p>
      </div>

      {/* cards  */}
      <div className="flex items-center justify-start mt-10 rotate-1">
        {cards.map((card, index) => {
          const lastIndex = cards.length - 1;
          if (card.type === "video") {
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRef.current[index] = el;
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`relative w-full p-4 rounded-4xl h-96 flex flex-col justify-between overflow-hidden ${
                  index === lastIndex
                    ? "-rotate-12"
                    : index === 1
                      ? "-rotate-10"
                      : ""
                }`}
              >
                <video
                  src={card?.video}
                  autoPlay
                  loop
                  muted
                  className="h-96 w-full object-cover absolute left-0 top-0"
                ></video>
              </div>
            );
          }

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRef.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{ backgroundColor: card.bgColor }}
              className={`w-full p-4 rounded-4xl h-96 flex flex-col justify-between  ${
                index === 0 ? "rotate-3" : index === 2 ? "-rotate-6" : ""
              }`}
            >
              <h2 className="text-5xl font-semibold">{card.title}</h2>

              <div className="w-full">
                <h2 className="text-2xl font-semibold">{card.subTitle}</h2>
                <div className="bg-black w-full h-0.5 rounded-2xl my-2"></div>
                <p>{card.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* paragraph  */}
      <p className="text-5xl font-bold w-2/3 md:ml-20 mt-28">
        Wij maken content die opvalt. Die blijft hangen. Die jouw doelgroep
        raakt en jouw merk in beweging brengt. Snel, krachtig en energiek.
      </p>

      {/* image banner bottom section  */}
      <div className="mt-16 flex items-center justify-center gap-5">
        <div className="w-100 rounded-xl overflow-hidden">
          <Image src={image1} className="w-full" alt="image" />
        </div>
        {/* text  */}
        <div className="relative ml-32">
          <p className="w-1/2 text-2xl font-semibold">
            We stoppen niet bij mooie plaatjes en vette beelden. We maken het
            meetbaar. Zo weet je precies wat werkt en wat niet. Nooit meer
            content zonder strategie. Nooit meer content zonder resultaat.
          </p>
          {/* leet ons kennen button  */}
          <button
            ref={leerButtonRef}
            onMouseEnter={handleLeerbuttonMouseEnter}
            onMouseLeave={handleLeerbuttonMouseLeave}
            className="flex items-center justify-center gap-2 border text-sm text-gray-600 font-semibold border-gray-500 p-1 rounded-xl cursor-pointer mt-5"
          >
            Leer ons kennen
            <span className="bg-black p-1 rounded-md">
              <ArrowRight className="w-5 h-5 text-white" />
            </span>
          </button>

          {/* down arrow button  */}
          <button
            onMouseEnter={handleArrowMouseEnter}
            onMouseLeave={handleArrowMouseLeave}
            className="absolute right-32 bottom-10 border border-gray-400 p-2 rounded-xl overflow-hidden w-10 h-10 flex items-center justify-center cursor-pointer"
          >
            {/* wrapper */}
            <div className="relative w-full h-full overflow-hidden">
              {/* default icon */}
              <div
                ref={topIconRef}
                className="absolute inset-0 flex items-center justify-center"
              >
                <ArrowDown className="w-5 h-5 text-orange-700" />
              </div>

              {/* animated icon */}
              <div
                ref={bottomIconRef}
                className="absolute inset-0 flex items-center justify-center translate-y-full"
              >
                <ArrowDown className="w-5 h-5 text-orange-700" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
