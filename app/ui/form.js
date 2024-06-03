"use client";

import { upload, getFiles, vercelUpload } from "../lib/actions";
import { Button, Divider, Switch, Card } from "@nextui-org/react";
import { useState, useRef } from "react";

export default function Form() {
  // getFiles();

  const [files, setFiles] = useState(null);
  const [isSelected, setIsSelected] = useState(true);
  const ref = useRef(null);

  return (
    <Card className=" m-4 md:w-[500px] w-[90vw] -z-10 p-4 rounded-sm">
      <form
        className="flex flex-col items-center"
        action={(formData) => {
          setFiles(null);
          vercelUpload(formData);
          ref.current?.reset();
        }}
        ref={ref}
      >
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
            setFiles(e.target.files);
          }}
        />
        {files && (
          <h4 className="self-start font-semibold text-slate-500">
            Selected Files
          </h4>
        )}
        <ul className="self-start list-disc ml-5 text-slate-400">
          {files &&
            Array.from(files).map((file) => (
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
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-4 h-12 rounded-sm border-1.5"
          type="number"
          name="price"
          placeholder="Enter car price"
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-4 h-12 rounded-sm border-1.5"
          type="text"
          name="colour"
          placeholder="Enter car colour"
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-4 h-12 rounded-sm border-1.5"
          type="number"
          name="year"
          placeholder="Enter car production year"
        />
        <input
          className="w-full p-4 bg-slate-200 m-2 mt-4 h-12 rounded-sm border-1.5"
          type="number"
          name="mileage"
          placeholder="Enter car mileage"
        />
        <textarea
          className="w-full h-40 p-4 bg-slate-200 m-2 mt-4 rounded-sm border-1.5"
          type="text"
          name="description"
          placeholder="Enter a description"
        />
        <h4 className="font-medium m-2 text-slate-500">Sold | Available</h4>
        <Switch
          defaultSelected
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
          Submit
        </Button>
      </form>
    </Card>
  );
}
