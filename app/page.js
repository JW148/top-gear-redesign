import Carousel from "./ui/carousel";

import {
  createImageTable,
  createListingsTable,
  getShowroomDataSQL,
} from "./lib/data";

export default async function Home() {
  console.log(await getShowroomDataSQL());
  return (
    <main className="flex flex-col min-h-screen items-center ">
      <Carousel />
    </main>
  );
}
