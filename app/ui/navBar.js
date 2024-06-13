"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full grid grid-cols-6 py-4 items-center text-center text-lg shadow-md text-gray-700 font-normal bg-gradient-to-t to-60% from-gray-300 z-10 relative">
        <p className="md:flex md:justify-self-center hidden">01501 763 800</p>
        <div className=" flex col-start-2 col-span-4 justify-center items-center ">
          <Image
            src={"/navbar/TopGearLogoLight.png"}
            alt="Top Gear logo"
            priority={true}
            width={200}
            height={140}
          />
        </div>
        <div className="md:flex flex-col hidden">
          <p>Address 1</p>
          <p>Address 2</p>
        </div>
        <div className="flex md:hidden justify-center">
          {menuOpen ? (
            <Button
              isIconOnly
              className="bg-transparent"
              onClick={() => setMenuOpen(false)}
              disableRipple={true}
            >
              <IoMdClose size={25} className="text-gray-700" />
            </Button>
          ) : (
            <Button
              isIconOnly
              className="bg-transparent"
              onClick={() => setMenuOpen(true)}
              disableRipple={true}
            >
              <IoMenu size={25} className="text-gray-700" />
            </Button>
          )}
        </div>
        {menuOpen && (
          <div className="flex flex-col font-light text-start text-gray-100 bg-black/65 backdrop-blur-2xl shadow-md w-full absolute -bottom-[165px] left-0">
            <div className="w-full flex h-[2px] bg-slate-700 mx-auto"></div>
            <Link
              className={clsx("pl-5 pt-5", {
                "font-bold": pathname === "/",
              })}
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className={clsx("pl-5 pt-5", {
                "font-bold": pathname.includes("/showroom"),
              })}
              href="/showroom"
              onClick={() => setMenuOpen(false)}
            >
              Showroom
            </Link>
            <Link
              className={clsx("pl-5 py-5", {
                "font-bold": pathname === "/contact",
              })}
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            {session && (
              <Link
                className={clsx("pl-5 py-5", {
                  "font-bold": pathname === "/admin",
                })}
                href="/admin"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="w-full md:flex h-[2px] bg-slate-700 mx-auto hidden"></div>
      <div className="md:flex md:flex-row sticky justify-center items-center top-0 bg-slate-100 h-14 text-2xl font-light text-gray-800 shadow-xl z-10 hidden">
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
            "font-normal underline": pathname === "/contact",
          })}
          href="/"
        >
          Contact
        </Link>
        {session && (
          <Link
            className={clsx("px-20 hover:underline", {
              "font-normal underline": pathname === "/admin",
            })}
            href="/admin"
          >
            Admin
          </Link>
        )}
      </div>
    </>
  );
}
