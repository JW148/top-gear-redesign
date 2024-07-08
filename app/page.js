import Carousel from "./ui/carousel";

import { createImageTable, createListingsTable } from "./lib/data";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center ">
      <Carousel />
    </main>
  );
}
