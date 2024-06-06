"use client";

import { useState, useRef } from "react";
import { compress } from "../lib/actions";
import { Button, Card } from "@nextui-org/react";
import { useFormState } from "react-dom";

export default function Page() {
  const [files, setFiles] = useState(null);
  const ref = useRef(null);

  const [state, dispatch] = useFormState(compress, {
    data: null,
  });

  return (
    <main className="flex min-h-screen flex-col justify-center items-center m-10">
      <h1 className="text-4xl font-light text-gray-700">Compression</h1>
      <Card className=" m-4 md:w-[500px] w-[90vw] p-4 rounded-sm">
        <form
          className="flex flex-col items-center"
          action={(formData) => {
            setFiles(null);
            dispatch(formData);
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
          {state?.data && (
            <h4 className="self-start font-semibold text-slate-500">
              File size after compression - {state.data} bytes
            </h4>
          )}

          <Button
            className="flex m-2 w-[60%] text-base text-slate-600 bg-white border-1 border-slate-400 hover:bg-slate-100"
            type="submit"
            radius="none"
          >
            Submit
          </Button>
        </form>
      </Card>
    </main>
  );
}
