"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const StackedScroll = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const boxes = gsap.utils.toArray<HTMLElement>(
      scrollRef.current?.children || [],
    );

    boxes.forEach((box) => {
      gsap.to(box, {
        x: 150,
        borderRadius: 150,
        scrollTrigger: {
          trigger: box,
          start: "bottom bottom",
          end: "top 20%",
          scrub: true,
        },
        ease: "power1.inOut",
      });
    });
  }, []);
  return (
    <div ref={scrollRef} className="container mx-auto py-20">
      <div className="w-40 h-40 bg-red-600"></div>
      <div className="w-40 h-40 bg-red-900"></div>
    </div>
  );
};

export default StackedScroll;
