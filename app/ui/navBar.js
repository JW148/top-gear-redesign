"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <>
      <div className="w-full grid grid-cols-6 py-4 items-center text-center text-lg text-gray-700 font-normal z-10">
        <p>01501 763 800</p>
        <div className=" flex col-start-2 col-span-4 justify-center items-center ">
          <Image
            src={"/navbar/TopGearLogoLight.png"}
            alt="Top Gear logo"
            priority={true}
            width={220}
            height={140}
          />
        </div>
        <div className="flex flex-col">
          <p>7 Stoneheap Crofts</p>
          <p>Bathgate EH47 8BX</p>
        </div>
      </div>
      <div className="w-full h-[2px] bg-slate-700 mx-auto"></div>
      <div className="sticky w-full flex flex-row justify-center items-center top-0 bg-slate-100 h-14 text-2xl font-light text-gray-800 shadow-xl z-10">
        <Link
          className={clsx("px-20 hover:underline", {
            "font-normal underline": pathname === "/",
          })}
          href="/"
        >
          Home
        </Link>
        <Link
          className={clsx("px-20 hover:underline", {
            "font-normal underline": pathname.includes("/showroom"),
          })}
          href="/showroom"
        >
          Showroom
        </Link>
        <Link
          className={clsx("px-20 hover:underline", {
            "font-nprmal underline": pathname === "/contact",
          })}
          href="/"
        >
          Contact
        </Link>
      </div>
    </>
  );
}
