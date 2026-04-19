"use client";
import Image from "next/image";
import gsap from "gsap";

// icons
import { ArrowRight, ArrowUpRight } from "lucide-react";

// images
import contentImage1 from "@/public/image/content/content1.avif";
import contentImage2 from "@/public/image/content/content2.avif";
import contentImage3 from "@/public/image/content/content3.avif";
import { useEffect, useRef } from "react";

const contents = [
  {
    id: 1,
    image: contentImage1,
    video: "/videos/content/Bullit _ Loop.mp4",
    title: "Zacht in smaak, sterk in beeld",
    buttonText: "Roasta",
    bgColor: "#138BFA",
  },
  {
    id: 2,
    image: contentImage2,
    video: "/videos/content/loco-bites-loop.mp4",
    title: "Van nul naar vol, binnen 3 weken",
    buttonText: "Buillit",
    bgColor: "#F35226",
  },
  {
    id: 3,
    image: contentImage3,
    video: "/videos/content/roasta-loop.mp4",
    title: "Content die écht smaakt (en raakt)",
    buttonText: "Loco",
    bgColor: "#57C892",
  },
];

const Content = () => {
  const cardRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline[]>([]);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  //   card mouse enter
  const handleCardMouseEnter = (index: number) => {
    const card = cardRef.current[index];
    const cardImage = card.querySelector(".cardImage");
    const cardVideo = card.querySelector(".cardVideo") as HTMLVideoElement;

    // cardVideo.play();
    cardVideo.play();

    gsap.to(cardRef.current[index], {
      skewX: 3,
    });
    // card video
    gsap.to(cardVideo, {
      opacity: 1,
    });
  }; // end card mouse enter

  //   handle mouse leave
  const handleCardMouseLeave = (index: number) => {
    const card = cardRef.current[index];
    const cardImage = card.querySelector(".cardImage");
    const cardVideo = card.querySelector(".cardVideo") as HTMLVideoElement;

    cardVideo.pause();
    cardVideo.currentTime = 0;

    gsap.to(cardRef.current[index], {
      skewX: 0,
    });

    gsap.to(cardVideo, {
      opacity: 0,
    });
  }; // end handle card mouse leave

  return (
    <div className="container mx-auto py-16 ">
      {/* content  */}
      <div className="space-y-4 px-20">
        <h2 className="text-7xl font-bold">
          Content <br /> dat scoort.
        </h2>
        <p className="text-xl font-semibold w-1/3">
          Wij vertellen jouw verhaal. Op een manier die écht past bij jouw
          doelgroep. Met creatieve content die werkt en het verschil maakt.
        </p>
        <button className="border border-gray-500 py-1 px-2 rounded-md flex items-center justify-center gap-2 cursor-pointer text-sm font-medium ">
          Bekijk al ons werk
          <span className="bg-black p-1 rounded-md">
            <ArrowRight className="w-5 h-5 text-white" />
          </span>
        </button>
      </div>

      {/* content cards  */}
      <div className="space-y-5 grid grid-cols-3 gap-5 w-full px-16 mt-5">
        {contents.map((content, index) => (
          <div
            ref={(el) => {
              if (el) cardRef.current[index] = el;
            }}
            onMouseEnter={() => handleCardMouseEnter(index)}
            onMouseLeave={() => handleCardMouseLeave(index)}
            style={{ backgroundColor: content.bgColor }}
            key={index}
            className={`relative w-80 h-100 rounded-2xl overflow-hidden cursor-pointer ${index === 1 ? "-mt-28" : index === 2 ? "-mt-48" : ""}`}
          >
            {/* image  */}
            <div className="cardImage absolute inset-0">
              <Image
                src={content.image}
                fill
                className="w-full h-full object-cover p-2 rounded-3xl"
                alt={content?.title}
              />
            </div>
            {/* video  */}
            <video
              src={content?.video}
              className="cardVideo w-full h-1/2 object-cover absolute inset-0 rounded-2xl p-2 opacity-0"
              loop
              muted
              autoPlay
            ></video>
            {/* {/* text  */}
            <div
              style={{
                background: content?.bgColor,
                clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0% 100%);",
              }}
              className="absolute bottom-5 flex items-start justify-end flex-col left-1/2 -translate-x-1/2 h-40 rounded-2xl transform w-[90%] origin-left p-1 py-2 px-2 rounded-tl-4xl space-y-1"
            >
              <h2 className="text-white text-2xl font-semibold w-3/4">
                {content?.title}
              </h2>
              <span className="bg-gray-300/65 text-white font-semibold text-sm rounded-md px-3 py-2">
                {content?.buttonText}
              </span>
              {/* icon  */}
              <span className="absolute right-3 top-3 text-black p-2 rounded-full bg-white">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
