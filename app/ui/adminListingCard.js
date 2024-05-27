import { Button, Card, CardHeader, Switch, CardBody } from "@nextui-org/react";

import Image from "next/image";
import Link from "next/link";

import { ConfirmDeleteListing } from "./confirmModel";

export default function AdminListingCard({ details }) {
  return (
    <div className="relative">
      <ConfirmDeleteListing id={details._id.toString()} />
      <Link href={`/admin/${details._id.toString()}/edit`}>
        <Card
          className="py-4 m-4 min-w-96 max-w-[400px] -z-10"
          radius="none"
          key={details._id}
        >
          <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
            <Image
              alt="Card background"
              className="object-cover rounded-sm "
              src={`/${details.files[0]}`}
              width={400}
              height={400}
            />
          </CardHeader>
          <CardBody className="overflow-visible px-4 mt-2">
            <div className="flex flex-row pt-2 justify-between text-slate-600">
              <p className="font-semibold">Model</p>

              <p className="truncate max-w-[70%]">{details?.model}</p>
            </div>
            <div className="flex flex-row pt-2  justify-between text-slate-600">
              <p className="font-semibold">Price</p>

              <p>£{parseInt(details?.price).toLocaleString()}</p>
            </div>
            <div className="flex flex-row pt-2  justify-between text-slate-600">
              <p className="font-semibold">Colour</p>

              <p>{details?.colour}</p>
            </div>
            <div className="flex flex-row pt-2  justify-between text-slate-600">
              <p className="font-semibold">Year</p>

              <p>{details?.year}</p>
            </div>
            <div className="flex flex-row pt-2 justify-between text-slate-600">
              <p className="font-semibold">Mileage</p>

              <p>{parseInt(details?.mileage).toLocaleString()}Km</p>
            </div>
            <div className="flex flex-row pt-2 justify-between text-slate-600">
              <p className="font-semibold">Date Listed</p>

              <p>{details?.date?.toString()}</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-medium m-2 text-slate-500">
                Sold | Available
              </h4>
              <Switch
                color="success"
                className="m-2"
                isSelected={details?.available}
              />
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}
