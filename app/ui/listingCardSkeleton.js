import { Card, CardHeader, CardBody } from "@nextui-org/react";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ListingCardSkeleton() {
  return (
    <Card
      className={`${shimmer} py-4 m-4 md:w-[400px] w-[90vw] -z-10 bg-gray-200`}
      radius="none"
    >
      <CardHeader className="pb-0 pt-0 px-4 justify-center ">
        <div className="w-full h-[300px] bg-gray-50 rounded-md"></div>
      </CardHeader>
      <CardBody className="px-4 mt-2">
        <div className="flex flex-row pt-2 justify-between">
          <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
          <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex flex-row pt-4 justify-between">
          <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
          <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex flex-row pt-4 justify-between">
          <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
          <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex flex-row pt-4 justify-between">
          <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
          <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex flex-row pt-4 justify-between">
          <div className="w-[35%] h-[20px] bg-gray-300 rounded-md"></div>
          <div className="w-[25%] h-[20px] bg-gray-300 rounded-md"></div>
        </div>
      </CardBody>
    </Card>
  );
}
