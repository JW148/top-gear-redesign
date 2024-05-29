"use client";

import { editListing } from "../lib/actions";
import {
  Button,
  Switch,
  Card,
  groupDataFocusVisibleClasses,
} from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PiMinusCircleFill } from "react-icons/pi";

export default function EditListing({ details }) {
  const [files, setFiles] = useState(details.files);
  const [newFiles, setNewFiles] = useState(null);
  const [isSelected, setIsSelected] = useState(details.available);
  const ref = useRef(null);

  const handleRemoveImage = (file) => {
    setFiles((oldArr) => oldArr.filter((item) => item !== file));
  };

  return (
    <Card className="w-[30vw] p-4 rounded-sm">
      <form
        className="flex flex-col items-center text-gray-600"
        action={editListing}
        ref={ref}
      >
        <input
          className="w-full p-4 bg-slate-200 m-2 mb-6 h-12 rounded-sm border-1.5 text-gray-400"
          type="text"
          name="_id"
          defaultValue={details._id}
          readOnly
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mb-6 h-12 rounded-sm border-1.5 text-gray-400"
          type="text"
          name="date"
          defaultValue={details.date}
          readOnly
          hidden
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mb-6 h-12 rounded-sm border-1.5 text-gray-400"
          type="text"
          name="files_to_delete"
          defaultValue={details.files.filter((x) => !files.includes(x))}
          readOnly
          hidden
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mb-6 h-12 rounded-sm border-1.5 text-gray-400"
          type="text"
          name="files_to_keep"
          value={files}
          readOnly
          hidden
        />
        <input
          className="w-full mb-2
          file:py-3 
          file:rounded-sm file:border-1 file:border-slate-400
          file:text-base file:font-medium
          file:bg-white file:text-slate-700
          hover:file:bg-slate-100 file:w-full"
          type="file"
          name="files"
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            console.log(e.target.files);
            setNewFiles(e.target.files);
          }}
        />

        <h4 className="self-start font-semibold text-slate-500">
          Existing Files
        </h4>

        <div className="flex flex-row overflow-hidden justify-center flex-wrap mt-4">
          {files.map((file) => (
            <div className="relative" key={file}>
              <Button
                isIconOnly
                className="absolute -top-2 -right-2 bg-transparent p-0 m-0 "
                aria-label="Delete listing button"
                onPress={() => handleRemoveImage(file)}
              >
                <PiMinusCircleFill className="size-6 text-danger-600" />
              </Button>
              <Image
                key={file}
                alt="Card background"
                className="m-2 object-cover max-h-[70px]"
                src={`${file}`}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
        {newFiles && (
          <h4 className="self-start font-semibold text-slate-500">New Files</h4>
        )}
        <ul className="self-start list-disc ml-5 text-slate-400">
          {newFiles &&
            Array.from(newFiles).map((file) => (
              <li key={file.name}>
                {file.name} - {file.size} bytes
              </li>
            ))}
        </ul>
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-6 h-12 rounded-sm border-1.5"
          type="text"
          name="model"
          placeholder="Enter car model"
          defaultValue={details.model}
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-4 h-12 rounded-sm border-1.5"
          type="number"
          name="price"
          placeholder="Enter car price"
          defaultValue={details.price}
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-4 h-12 rounded-sm border-1.5"
          type="text"
          name="colour"
          placeholder="Enter car colour"
          title="Please enter car colour"
          defaultValue={details.colour}
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-4 h-12 rounded-sm border-1.5"
          type="number"
          name="year"
          placeholder="Enter car production year"
          defaultValue={details.year}
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-4 h-12 rounded-sm border-1.5"
          type="number"
          name="mileage"
          placeholder="Enter car mileage"
          defaultValue={details.mileage}
        />
        <textarea
          className="w-full h-40 p-4 bg-slate-200 m-2 mt-4 rounded-sm border-1.5"
          type="text"
          name="description"
          placeholder="Enter a description"
          defaultValue={details.description}
        />
        <h4 className="font-medium m-2 text-slate-500">Sold | Available</h4>
        <Switch
          color="success"
          className="m-2"
          name="available"
          isSelected={isSelected}
          onValueChange={setIsSelected}
          value={isSelected}
        />
        <Button
          className="flex m-2 w-[60%] text-base text-slate-600 bg-white border-1 border-slate-400 hover:bg-slate-100"
          type="submit"
          radius="none"
        >
          Update
        </Button>
      </form>
    </Card>
  );
}
