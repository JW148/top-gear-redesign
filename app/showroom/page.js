import ListstingCard from "../ui/listingCard";

import { getShowroomData } from "../lib/data";

import Image from "next/image";

export default async function Page() {
  const carData = await getShowroomData();
  console.log(carData);
  return (
    <main className="flex min-h-screen flex-col justify-center items-center m-10">
      <h1 className="text-4xl font-light text-gray-700">Showroom</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {carData.map((el) => (
          <ListstingCard details={el} key={el._id} />
        ))}
      </div>
    </main>
  );
}
