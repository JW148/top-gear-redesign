import NavBar from "./ui/navBar";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center px-0 mx-0">
      <NavBar />
      <h1 className="font-semibold text-4xl mt-40 h-screen">Home</h1>
      <h1 className="font-semibold text-4xl mt-10 h-screen">Home</h1>
      <h1 className="font-semibold text-4xl mt-10 h-screen">Home</h1>
    </main>
  );
}
