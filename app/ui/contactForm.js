"use client";

import { Button, Card } from "@nextui-org/react";
import { useRef } from "react";
import { contact } from "../lib/actions";

export default function ContactForm() {
  const ref = useRef(null);

  return (
    <Card className=" m-4 md:w-[500px] w-[90vw] p-4 rounded-sm">
      <form
        className="flex flex-col items-center"
        action={(formData) => {
          contact(formData);
          ref.current?.reset();
        }}
        ref={ref}
      >
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-6 h-12 rounded-sm border-1.5"
          type="text"
          name="name"
          placeholder="Name"
          required
          pattern="\S(.*\S)?"
          title="This field is required"
        />
        {/* field below is for spam protection only */}
        <input
          className="hidden"
          type="text"
          id="confirmEmail"
          name="confirmEmail"
          placeholder="Email"
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-6 h-12 rounded-sm border-1.5"
          type="text"
          name="email"
          placeholder="Email"
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          title="Please enter a valid email"
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-6 h-12 rounded-sm border-1.5"
          type="tel"
          name="tel"
          placeholder="Telephone"
          pattern="[0-9]{11,14}"
          title="Please enter a valid phone number"
        />
        <textarea
          className="w-full h-40 p-4 bg-slate-200 m-2 mt-4 rounded-sm border-1.5"
          type="text"
          name="message"
          placeholder="Message"
        />
        <Button
          className="flex m-2 w-[60%] text-base text-slate-600 bg-white border-1 border-slate-400 hover:bg-slate-100"
          type="submit"
          radius="none"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}
