import Form from "../ui/form";
import AdminListingCard from "../ui/adminListingCard";
import { getData } from "../lib/data";

export default async function Page() {
  const carData = await getData();
  console.log(carData);
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24">
      <h1 className="font-medium text-4xl m-4">New Listing</h1>
      <Form />
      <h1 className="font-medium text-4xl m-4">Listings</h1>
      <div className="flex flex-row flex-wrap justify-center">
        {carData.map((el) => (
          <AdminListingCard details={el} />
        ))}
      </div>
    </main>
  );
}
