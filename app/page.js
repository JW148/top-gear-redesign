import Carousel from "./ui/carousel";

import {
  createImageTable,
  createListingsTable,
  getShowroomDataSQL,
  getListingByIdSQL,
} from "./lib/data";

export default async function Home() {
  console.log(await getListingByIdSQL("cbf82108-51de-4cf3-b050-9615eb0fb920"));
  return (
    <main className="flex flex-col min-h-screen items-center ">
      <Carousel />
    </main>
  );
}
