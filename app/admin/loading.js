import { ListingCardSkeleton } from "../ui/listingCardSkeleton";
import { FormSkeleton } from "../ui/formSkeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center m-20">
      <h1 className="text-4xl font-light text-gray-700 mb-4">New Listing</h1>
      <FormSkeleton />
      <h1 className="text-4xl font-light text-gray-700 mb-4 mt-20">Listings</h1>
      <div className="flex flex-row flex-wrap justify-center">
        <ListingCardSkeleton />
        <ListingCardSkeleton />
        <ListingCardSkeleton />
        <ListingCardSkeleton />
        <ListingCardSkeleton />
        <ListingCardSkeleton />
        <ListingCardSkeleton />
      </div>
    </main>
  );
}
