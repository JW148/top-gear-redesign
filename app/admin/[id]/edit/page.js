import { getListingById } from "@/app/lib/data";
import EditListing from "@/app/ui/editForm";

export default async function Page({ params: { id } }) {
  console.log(id);
  const listing = await getListingById(id);
  return (
    <main className="flex min-h-screen flex-col justify-center items-center m-20">
      <h1 className="text-4xl font-light text-gray-700 mb-4">Edit Listing</h1>
      <EditListing details={listing} />
    </main>
  );
}
