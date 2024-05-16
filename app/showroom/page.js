import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";

import { getData } from "../lib/data";

export default async function Page() {
  const carData = await getData();
  console.log(carData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-semibold text-4xl">Showroom</h1>
      <div className="flex flex-row ">
        {carData.map((el) => (
          <Card className="py-4 m-4" key={el._id}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={`/${el.files[0]}`}
                width={270}
                height={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-small uppercase font-bold">
                Model: {el.model}
              </p>
              <p className="text-small uppercase font-bold">
                Price: £{el.price}
              </p>
              <p className="text-small uppercase font-bold">
                Colour: {el.colour}
              </p>
              <p className="text-small uppercase font-bold">Year: {el.year}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
