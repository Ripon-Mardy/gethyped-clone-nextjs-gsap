"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const brands = [
  {
    id: 1,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/684c05642bf8f5cea7384403_de-talententuin.svg",
  },
  {
    id: 2,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68c1952f22281ee50d3620b5_zclv.svg",
  },
  {
    id: 3,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/69241146b4df63c4ca966552_Bullit%20Digital.svg",
  },
  {
    id: 4,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68c194e6d1b186563459b107_morssinkhof.svg",
  },
  {
    id: 5,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d88f755388cc2c74ecff_salontopper.svg",
  },
  {
    id: 6,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d880bed5996600cbc586_seesing-flex.svg",
  },
  {
    id: 7,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d86cd6ba384af3c14e58_graafschap-college.svg",
  },
  {
    id: 8,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d85341bf0d7476e56a8c_fides.svg",
  },
  {
    id: 9,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d838fc5735f090bd9843_SRHK.svg",
  },
  {
    id: 10,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d81e72e08110e3fd1a17_knltb.svg",
  },
  {
    id: 11,
    image:
      "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/684b062ebc242028ca4b3ea1_tho.svg",
  },
];

const Brands = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const totalWidth = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      x: -totalWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    });

    return () => {
      tween.kill();
    };
  }, []); // end useEffect
  return (
    <div className=" py-20 overflow-hidden">
      <h2 className="container mx-auto text-3xl md:text-5xl font-bold">
        These brands <br /> got hyped.
      </h2>

      {/* brands  */}
      <div ref={trackRef} className="flex gap-10 mt-10">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="w-32 h-32 
                sm:w-40 sm:h-40 
                md:w-60 md:h-60 
                border border-gray-400 
                shrink-0 
                rounded-xl 
                flex items-center justify-center 
                bg-white p-4 overflow-hidden"
          >
            <Image
              src={brand?.image}
              width={100}
              height={100}
              className="w-full h-full object-contain"
              alt="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
