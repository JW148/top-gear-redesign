import LoginForm from "../ui/loginForm";

export default function Page() {
  return (
    <main className="flex flex-col   items-center md:h-screen">
      <h1 className="text-4xl font-light text-gray-700 m-14">Login</h1>
      <LoginForm />
    </main>
  );
}
