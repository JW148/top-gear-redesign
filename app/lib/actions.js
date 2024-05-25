"use server";

import { join } from "path";
import { writeFile, readdir, unlink } from "fs/promises";
import { revalidatePath } from "next/cache";

const { MongoClient, ObjectId } = require("mongodb");

//create a new MongoClient object and connect to the Stock DB
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("TopGear");

/**
 * This React Server Action takes the form data submitted by the user and does two things:
 * 1. writes the uploaded images the the /public folder on the server's local file system
 * 2. records a new entry to the 'car' collection in the MongoDB that stores the form data and the name of the image
 *    so that the correct image file can be served to the user when requested
 *
 * @param {*} formData Form data, including image files, submitted by the user
 * @returns success if file write performed successfully, Error otherwise
 */
export async function upload(formData) {
  //deconstruct the form data submitted by the client
  const { model, price, colour, year, description, available, mileage } =
    Object.fromEntries(formData.entries());
  const fileArr = formData.getAll("files");
  const fileNames = fileArr.map((file) => file.name);
  console.log(fileNames);
  console.log(model, price, colour, year, description, available, mileage);

  /////////////// write uploaded file to file system ////////////////

  try {
    if (fileArr[0].size === 0) throw new Error("No files uploaded ");
    fileArr.forEach(async (file) => {
      //turn the file into a buffer object so that it can be handled by Node
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      //with the file data in a buffer, we can write it to the filesystem
      //process.cwd() gets the current Node directory
      const path = join(process.cwd() + "/public/" + file.name);
      await writeFile(path, buffer);
      console.log(`Open ${path} to view the uploaded file`);
    });
  } catch (err) {
    return { error: "Image upload unsuccessful" };
  }

  ///////////// Record a new entry in the DB ////////////////

  try {
    console.log("Connecting to server...");
    await client.connect();

    console.log("Connecting to collection...");
    const collection = db.collection("Cars");

    console.log("Inserting new document...");
    const doc = {
      files: fileNames,
      model: model,
      price: price,
      colour: colour,
      year: year,
      mileage: mileage,
      description: description,
      available: available ? true : false,
      date: new Date().toLocaleString(),
    };
    const result = await collection.insertOne(doc);
    //clears the cache and triggers a new request to the DB to display the recently added listing without the user having to refresh the page
    revalidatePath("/admin");
    return JSON.stringify({ success: true, response: result });
  } catch (err) {
    throw new Error("Failed to insert new document into collection: " + err);
  }
}

export async function deleteListing(id) {
  console.log("Delete action " + id);
  try {
    console.log("Connecting to server...");
    await client.connect();

    console.log("Connecting to collection...");
    const collection = db.collection("Cars");

    console.log("Deleting document " + id);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    //clears the cache and triggers a new request to the DB to display the recently added listing without the user having to refresh the page
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    throw new Error("Failed to insert new document into collection: " + err);
  }
}

export async function getFiles() {
  const files = await readdir(join(process.cwd() + "/public"));
  console.log("Deleting file " + files[4]);
  await unlink(join(process.cwd() + "/public/" + files[4]));
  console.log(join(process.cwd() + "/public"));
  console.log(files);
}
