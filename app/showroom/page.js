import ListstingCard from "../ui/listingCard";

import { getData } from "../lib/data";

export default async function Page() {
  const carData = await getData();
  console.log(carData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-hidden">
      <h1 className="font-semibold text-4xl">Showroom</h1>
      <div className="flex flex-row flex-wrap">
        {carData.map((el) => (
          <ListstingCard details={el} />
        ))}
      </div>
    </main>
  );
}
