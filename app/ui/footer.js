"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function Footer() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col w-full h-[20vh] bg-gradient-to-t to-60% from-gray-300 items-center justify-center">
      {session ? (
        <>
          <p className="font-light text-xl">
            Signed in as {session.user.username}
          </p>
          <Button
            className="flex mt-6 mx-auto w-[20%] text-base text-slate-600 bg-white border-1 border-slate-400 hover:bg-slate-100 "
            onClick={() => signOut()}
            radius="none"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Button
          className="flex mt-6 mx-auto w-[20%] text-base text-slate-600 bg-white border-1 border-slate-400 hover:bg-slate-100 "
          onClick={() => signIn()}
          radius="none"
        >
          Sign In
        </Button>
      )}
    </div>
  );
}
