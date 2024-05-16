import { upload, getFiles } from "../lib/actions";
import { Button } from "@nextui-org/react";

export default function Form() {
  getFiles();
  return (
    <div className="flex">
      <form className="flex-col" action={upload}>
        <input
          className="flex m-2"
          type="file"
          name="files"
          multiple
          accept=".jpeg"
        />
        <input
          className="flex m-2"
          type="text"
          name="model"
          placeholder="Enter car model"
        />
        <input
          className="flex m-2"
          type="number"
          name="price"
          placeholder="Enter car price"
        />
        <input
          className="flex m-2"
          type="text"
          name="colour"
          placeholder="Enter car colour"
        />
        <input
          className="flex m-2"
          type="number"
          name="year"
          placeholder="Enter car production year"
        />
        <Button className="flex m-2" type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}
