import ListstingCard from "../ui/listingCard";

import { getData } from "../lib/data";

export default async function Page() {
  const carData = await getData();
  console.log(carData);
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 overflow-hidden">
      <h1 className="font-semibold text-4xl mb-4 text-gray-700">Showroom</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {carData.map((el) => (
          <ListstingCard details={el} />
        ))}
      </div>
    </main>
  );
}
