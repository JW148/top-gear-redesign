import Form from "../ui/form";
import AdminListingCard from "../ui/adminListingCard";
import { getData } from "../lib/data";

export default async function Page() {
  let carData = await getData();
  console.log(carData);
  return (
    <main className="flex min-h-screen flex-col justify-center items-center m-20">
      <h1 className="text-4xl font-light text-gray-700 mb-4">New Listing</h1>
      <Form />
      <h1 className="text-4xl font-light text-gray-700 mb-4 mt-20">Listings</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {carData.map((el) => (
          <AdminListingCard details={el} />
        ))}
      </div>
    </main>
  );
}
