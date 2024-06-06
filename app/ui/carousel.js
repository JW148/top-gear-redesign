"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export default function Carousel() {
  const [emblaRef1] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  const [emblaRef2] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  return (
    <>
      {/* Desktop */}
      <div
        className="embla md:block mx-auto h-screen w-full hidden "
        ref={emblaRef1}
      >
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
      {/* Mobile */}
      <div className="embla h-screen w-full md:hidden " ref={emblaRef2}>
        <div className="embla__container h-screen">
          <div className="embla__slide flex flex-col">
            <div className="flex-1 relative overflow-hidden">
              <Image
                src={"/MobileCarousel/DSC_3149 (2).jpeg"}
                alt="Home background image"
                style={{ objectFit: "cover" }}
                fill={true}
                priority={true}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-60%"></div>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <Image
                src={"/MobileCarousel/DSC_3143 (2).jpeg"}
                alt="Home background image"
                style={{ objectFit: "cover" }}
                fill={true}
                priority={true}
              />
              <div className="absolute top-0 left-0 w-full h-full backdrop-blur-lg bg-black/45"></div>
              <div className="absolute w-full top-[35%] text-gray-50 font-extralight mx-auto text-center flex flex-col">
                <p className="text-xl pb-2">Welcome to</p>
                <p className="text-3xl font-semibold">Top Gear</p>
                <p className="text-xl pt-2">Specialist Cars</p>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden ">
              <Image
                src={"/MobileCarousel/DSC_3276_0.jpeg"}
                alt="Home background image"
                style={{ objectFit: "cover" }}
                fill={true}
                priority={true}
              />
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-60%"></div>
              <Link
                href={"/showroom"}
                className="absolute w-full bottom-[10%] py-2 text-gray-100 text-2xl font-extralight mx-auto text-center "
              >
                <p>Explore &rarr;</p>
              </Link>
            </div>
          </div>
          <div className="embla__slide relative overflow-hidden">
            <Image
              src={"/MobileCarousel/DSC_3149 (2).jpeg"}
              alt="Home background image"
              style={{ objectFit: "cover" }}
              fill={true}
              priority={true}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black to-90%"></div>
            <p className="absolute w-full top-[5%] px-11 text-gray-100 text-lg font-extralight mx-auto text-pretty text-center tracking-wider ">
              Top Gear offer a great range of high performance and prestige cars
              including Ferrari, Maserati, Porsche, Lamborghini and Aston
              Martin.
            </p>
          </div>
          <div className="embla__slide relative overflow-hidden">
            <Image
              src={"/MobileCarousel/DSC_3143 (2).jpeg"}
              alt="Home background image"
              style={{ objectFit: "cover" }}
              fill={true}
              priority={true}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-black/15"></div>
            <p className="absolute w-full top-[60%] px-11 text-gray-100 text-lg font-extralight mx-auto text-pretty text-center tracking-wider ">
              Our staff not only enjoy first hand experience of the products
              they sell but understand and share your passion for exciting and
              stylish cars.
            </p>
          </div>
          <div className="embla__slide relative overflow-hidden">
            <Image
              src={"/MobileCarousel/DSC_3276_0.jpeg"}
              alt="Home background image"
              style={{ objectFit: "cover" }}
              fill={true}
              priority={true}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-70%"></div>
            <p className="absolute w-full bottom-[15%] px-11 text-gray-100 text-lg font-extralight mx-auto text-pretty text-center tracking-wider ">
              All our cars are finished to the highest standard and will
              represent an excellent example of your chosen marque.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
