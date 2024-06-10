import { ListingCardSkeleton } from "../ui/listingCardSkeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center m-10">
      <h1 className="text-4xl font-light text-gray-700">Showroom</h1>
      <div className="flex flex-row flex-wrap justify-center">
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
