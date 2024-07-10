import Carousel from "./ui/carousel";

import {
  createImageTable,
  createListingsTable,
  getShowroomDataSQL,
  getListingByIdSQL,
  deleteListingSQL,
} from "./lib/data";

export default async function Home() {
  await deleteListingSQL("26cf0607-3e05-45f4-af88-bbf5d085d4b3");
  return (
    <main className="flex flex-col min-h-screen items-center ">
      <Carousel />
    </main>
  );
}
