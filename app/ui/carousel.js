"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  return (
    <div className="embla mx-auto h-screen w-full border" ref={emblaRef}>
      <div className="embla__container h-full">
        <div className="embla__slide relative">
          <div className="w-full h-full bg-gradient-to-br from-black to-50%"></div>
          <Image
            className="block -z-10"
            style={{ objectFit: "cover" }}
            src={"/background/DSC_1740.jpeg"}
            alt="Home page background image"
            quality={100}
            priority={true}
            fill={true}
          />
        </div>
        <div className="embla__slide relative">
          <div className="absolute top-[10%] left-[5%] text-slate-100 w-[30%] leading-loose tracking-wide text-2xl font-light">
            <p>Top Gear offer a great range of high</p>
            <p>performance and prestige</p>
            <p>prestige cars including</p>
            <p>Maserati, Porsche,</p>
            <p>Lamborghini and</p>
            <p>Aston Martin.</p>
          </div>
          <div className="w-full h-full bg-gradient-to-r from-black to-70%"></div>
          <Image
            className="block -z-10"
            style={{ objectFit: "cover" }}
            src={"/background/DSC_3306.jpeg"}
            alt="Home page background image"
            quality={100}
            priority={true}
            fill={true}
          />
        </div>
        <div className="embla__slide relative">
          <div className="absolute bottom-[20%]  text-slate-100 w-full leading-loose tracking-wide text-2xl font-light text-center">
            <p className="w-[30%] mx-auto">
              Our staff not only enjoy first hand experience of the products
              they sell but understand and share your passion for exciting and
              stylish cars.
            </p>
          </div>
          <div className="w-full h-full bg-gradient-to-t from-black"></div>
          <Image
            className="block -z-10"
            style={{ objectFit: "cover" }}
            src={"/background/DSC_3149 (2).jpeg"}
            alt="Home page background image"
            quality={100}
            priority={true}
            fill={true}
          />
        </div>
        <div className="embla__slide relative">
          <div className="absolute top-[10%] right-[5%] text-slate-100 w-[30%] leading-loose tracking-wide text-2xl font-light text-right">
            <p>All our cars are finished to the highest</p>
            <p>standard and will represent</p>
            <p>an excellent example</p>
            <p>of your chosen</p>
            <p>marque.</p>
          </div>
          <div className="w-full h-full bg-gradient-to-bl from-black to-50%"></div>
          <Image
            className="block -z-10"
            style={{ objectFit: "cover" }}
            src={"/background/DSC_3316.jpeg"}
            alt="Home page background image"
            quality={100}
            priority={true}
            fill={true}
          />
        </div>
        <div className="embla__slide relative">
          <div className="absolute top-[20%]  text-slate-100 w-full leading-loose tracking-wide text-2xl font-light  text-center hover:underline">
            <Link href={"/showroom"}>
              <p className="w-[30%] mx-auto">Explore &rarr;</p>
            </Link>
          </div>
          <div className="w-full h-full bg-gradient-to-b from-black to-80%"></div>
          <Image
            className="block -z-10"
            style={{ objectFit: "cover" }}
            src={"/background/DSC_3127 (2).jpeg"}
            alt="Home page background image"
            quality={100}
            priority={true}
            fill={true}
          />
        </div>
      </div>
    </div>
  );
}
