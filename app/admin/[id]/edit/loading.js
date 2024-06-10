import { FormSkeleton } from "@/app/ui/formSkeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center m-20">
      <h1 className="text-4xl font-light text-gray-700 mb-4">Edit Listing</h1>
      <FormSkeleton />
    </main>
  );
}
