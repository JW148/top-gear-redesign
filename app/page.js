import Carousel from "./ui/carousel";

import {
  createImageTable,
  createListingsTable,
  getShowroomDataSQL,
  getListingByIdSQL,
  deleteListingSQL,
  getUserSQL,
} from "./lib/data";

export default async function Home() {
  // await getUserSQL("dev");
  return (
    <main className="flex flex-col min-h-screen items-center ">
      <Carousel />
    </main>
  );
}
