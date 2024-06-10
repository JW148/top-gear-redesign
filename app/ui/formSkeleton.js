import { Card } from "@nextui-org/react";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function FormSkeleton() {
  return (
    <Card
      className={`${shimmer} flex m-4 md:w-[500px] w-[90vw] justify-center p-4 rounded-sm`}
    >
      <div className="w-[95%] h-12 bg-gray-300 mx-auto rounded-sm mt-5"></div>
      <div className="w-[95%] h-12 bg-gray-300 mx-auto rounded-sm mt-5"></div>
      <div className="w-[95%] h-12 bg-gray-300 mx-auto rounded-sm mt-5"></div>
      <div className="w-[95%] h-12 bg-gray-300 mx-auto rounded-sm mt-5"></div>
      <div className="w-[95%] h-12 bg-gray-300 mx-auto rounded-sm mt-5"></div>
      <div className="w-[95%] h-12 bg-gray-300 mx-auto rounded-sm mt-5"></div>
      <div className="w-[95%] h-40 bg-gray-300 mx-auto rounded-sm mt-5"></div>
      <div className="w-[13%] h-8 bg-gray-300 mx-auto rounded-full mt-5"></div>
      <div className="w-[60%] h-12 bg-gray-200 mx-auto rounded-sm mt-5"></div>
    </Card>
  );
}
