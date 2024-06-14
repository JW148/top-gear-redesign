"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col w-full h-[40vh] bg-gradient-to-t to-70% from-gray-300 items-center justify-center mt-2">
      <div className="flex flex-row justify-center text-center mb-4">
        <Link
          className="text-md text-gray-600 font-light mx-3 md:mx-6 md:text-lg"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="text-md text-gray-600 font-light mx-3 md:mx-6 md:text-lg"
          href={"/"}
        >
          Previously Sold
        </Link>
        <Link
          className="text-md text-gray-600 font-light mx-3 md:mx-6 md:text-lg"
          href={"/"}
        >
          Contact
        </Link>
      </div>
      <Image
        src={"/navbar/TopGearLogoLight.png"}
        alt="Top Gear logo"
        priority={true}
        width={200}
        height={140}
        className="mb-4"
      />
      <p className="text-2xl text-gray-600 font-extralight mb-8">
        01501 763 800
      </p>
      {session ? (
        <>
          <p className="font-light text-md text-gray-600">
            Signed in as {session.user.username}
          </p>
          <Button
            className="flex mt-2 mx-auto w-[25%] md:w-[10%] text-base text-slate-600 bg-white border-1 border-slate-400 hover:bg-slate-100 "
            onClick={() => signOut()}
            radius="none"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Button
          className="flex mt-2 mx-auto w-[25%] md:w-[10%] text-base text-slate-600 bg-white border-1 border-slate-400 hover:bg-slate-100 "
          onClick={() => signIn()}
          radius="none"
        >
          Sign In
        </Button>
      )}
      <div className="flex flex-row justify-center w-full mt-10">
        <Link
          className=" flex flex-1 text-sm text-gray-600 font-light text-right justify-end mx-2"
          href={"/"}
        >
          Privacy Policy
        </Link>
        <p>|</p>
        <Link
          className="flex flex-1 text-sm text-gray-600 font-light mx-2"
          href={"/"}
        >
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}
