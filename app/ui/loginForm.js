"use client";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";

export default function LoginForm() {
  const handleSubmit = async (event) => {
    //get the credentials from the form
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    try {
      const response = await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        callbackUrl: "/admin",
      });
      console.log(response);
      if (response.status === 401) {
        alert("Incorrect credentials. Please try again.");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            setError("Invalid credentials.");
          default:
            setError("Something went wrong.");
        }
      }
      throw error;
    }
  };

  return (
    <div className="m-4 md:w-[500px] w-[90vw] p-4 rounded-sm border  ">
      <form onSubmit={handleSubmit}>
        <p className="text-base text-gray-500 mb-1 font-semibold">Username</p>
        <input
          className="w-full p-4 bg-gray-200 h-12 rounded-sm border-1.5"
          type="text"
          name="username"
          placeholder="Enter username"
        />
        <p className="text-base text-gray-500 mt-4 mb-1 font-semibold">
          Password
        </p>
        <input
          className="w-full p-4 bg-gray-200 h-12 rounded-sm border-1.5"
          type="password"
          name="password"
          placeholder="Enter password"
        />
        <Button
          className="flex mt-6 mx-auto w-[40%] text-base text-slate-600 bg-white border-1 border-slate-400 hover:bg-slate-100 "
          type="submit"
          radius="none"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
