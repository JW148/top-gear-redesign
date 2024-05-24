import { getListingById } from "@/app/lib/data";
import AdminListingCard from "@/app/ui/listingCard";

export default async function Page({ params: { id } }) {
  console.log(id);
  const listing = await getListingById(id);
  console.log(listing);
  return <AdminListingCard details={listing} />;
}
