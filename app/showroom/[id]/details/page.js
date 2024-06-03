import { getListingById } from "@/app/lib/data";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default async function Page({ params: { id } }) {
  console.log(id);
  const listing = await getListingById(id);
  console.log(listing);

  return (
    <div className="flex justify-center min-h-screen ">
      <div className="flex flex-col gap-4 w-[80%] m-10">
        <div className="md:text-4xl text-3xl font-light text-gray-700">
          {listing.model}
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex relative overflow-hidden">
            <Image
              alt="Card background"
              className="object-cover rounded-sm"
              src={`${listing.files[0]}`}
              width={800}
              height={800}
            />
          </div>
          <div className="flex flex-col md:px-10 px-2 min-w-[50%] h-auto md:ml-4 md:mt-0 mt-6 border-1 justify-evenly md:text-xl text-lg  ">
            <div className="flex  text-slate-600 ">
              <p className="font-light md:text-3xl text-2xl tracking-wide">
                Specification
              </p>
            </div>
            <div className="flex flex-row pt-2  justify-between text-gray-600">
              <p className="font-semibold">Price</p>

              <p className="font-light">
                £{parseInt(listing?.price).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-row pt-2  justify-between text-gray-600">
              <p className="font-semibold">Colour</p>

              <p className="font-light truncate max-w-[70%]">
                {listing?.colour}
              </p>
            </div>
            <div className="flex flex-row pt-2  justify-between text-gray-600">
              <p className="font-semibold">Year</p>

              <p className="font-light">{listing?.year}</p>
            </div>
            <div className="flex flex-row pt-2 justify-between text-gray-600">
              <p className="font-semibold">Mileage</p>

              <p className="font-light">
                {parseInt(listing?.mileage).toLocaleString()}Km
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                className="flex m-2 w-[40%] text-base text-gray-700 bg-white border-1 border-gray-500 hover:bg-slate-100 hover:text-gray-900"
                radius="none"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
        <div className="font-light text-2xl mt-6 text-gray-600">
          Description
          <p className="text-base leading-loose tracking-wide text-justify mt-4 text-gray-500">
            {listing?.description}
          </p>
        </div>
        <div className="font-light text-2xl mt-4 text-gray-600">
          Gallery
          <div className="flex flex-row overflow-hidden justify-center flex-wrap mt-4">
            {listing.files.map((file) => (
              <Image
                key={file}
                alt="Card background"
                className="m-2 object-cover max-h-[400px]"
                src={`${file}`}
                width={400}
                height={400}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
