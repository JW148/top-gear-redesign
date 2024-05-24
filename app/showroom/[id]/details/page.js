import { getListingById } from "@/app/lib/data";
import ListstingCard from "@/app/ui/listingCard";

export default async function Page({ params: { id } }) {
  console.log(id);
  const listing = await getListingById(id);
  console.log(listing);
  return <ListstingCard details={listing} />;
}
