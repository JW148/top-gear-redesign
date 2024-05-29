"use server";

import { join } from "path";
import { writeFile, readdir, unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  //create uniqe ID's for file names
  const uniqueFiles = fileNames.map(
    () => Math.random().toString(16).slice(2) + ".jpg"
  );

  console.log("unique files" + uniqueFiles);

  /////////////// write uploaded file to file system ////////////////

  try {
    if (fileArr[0].size === 0) throw new Error("No files uploaded ");
    fileArr.forEach(async (file, i) => {
      //turn the file into a buffer object so that it can be handled by Node
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      //with the file data in a buffer, we can write it to the filesystem
      //process.cwd() gets the current Node directory
      const path = join(process.cwd() + "/public/" + uniqueFiles[i]);
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
      files: uniqueFiles,
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

export async function deleteImage(file) {
  console.log(file);
}

export async function editListing(formData) {
  //first, get the updated form data
  const {
    _id,
    model,
    price,
    colour,
    year,
    description,
    available,
    mileage,
    files_to_delete,
    files_to_keep,
  } = Object.fromEntries(formData.entries());

  //files_to_delete is returned as a single string so they need to be split and turned into an array
  //NOTE: if there are no files being deleted, the following will still produce an array of length 1, e.g. ['']
  const filesToDelete = files_to_delete.split(",");

  // //do the same for files_to_keep
  const filesToKeep = files_to_keep.split(",");

  console.log(filesToKeep);
  console.log(filesToDelete);

  // //then, get any new files that have been added
  //NOTE: if no new files are uploaded, the following will still produce an array of length 1
  const fileArr = formData.getAll("files");
  const fileNames = fileArr.map((file) => file.name);
  console.log(fileArr);
  //create uniqe ID's for file names
  const uniqueFiles = fileNames.map(
    () => Math.random().toString(16).slice(2) + ".jpg"
  );

  // ///////////////// write new images to server file system ///////////////////////////
  try {
    //first check that there is a file before trying to write it by looking at the size field
    if (fileArr[0].size !== 0) {
      console.log("Writing files...");
      fileArr.forEach(async (file, i) => {
        //turn the file into a buffer object so that it can be handled by Node
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        //with the file data in a buffer, we can write it to the filesystem
        //process.cwd() gets the current Node directory
        const path = join(process.cwd() + "/public/" + uniqueFiles[i]);
        await writeFile(path, buffer);
        console.log(`Open ${path} to view the uploaded file`);
      });
    }
  } catch (err) {
    return { error: "Image upload unsuccessful" };
  }

  // /////////////////// delete files from server file system that were marked for deletion /////////////////////
  try {
    //first check if there are files to delete
    if (filesToDelete[0] !== "") {
      console.log("Deleting files...");
      filesToDelete.forEach(async (file) => {
        await unlink(join(process.cwd() + "/public/" + file));
      });
    }
  } catch (error) {
    console.error("Could not delete file " + error);
  }

  ///////////////// update DB document with new data /////////////////////
  try {
    console.log("Connecting to server...");
    await client.connect();

    console.log("Connecting to collection...");
    const collection = db.collection("Cars");

    console.log("Inserting new document...");

    //only concat if new files exists
    const files =
      fileArr[0].size !== 0 ? filesToKeep.concat(uniqueFiles) : filesToKeep;

    const updateDoc = {
      $set: {
        files: files,
        model: model,
        price: price,
        colour: colour,
        year: year,
        mileage: mileage,
        description: description,
        available: available ? true : false,
      },
    };

    const doc = {
      files: files,
      model: model,
      price: price,
      colour: colour,
      year: year,
      mileage: mileage,
      description: description,
      available: available ? true : false,
    };

    console.log(doc);

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      updateDoc
    );
    console.log(result);
    //clears the cache and triggers a new request to the DB to display the recently added listing without the user having to refresh the page
  } catch (err) {
    throw new Error("Failed to insert new document into collection: " + err);
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function getFiles() {
  const files = await readdir(join(process.cwd() + "/public"));
  console.log("Deleting file " + files[4]);
  await unlink(join(process.cwd() + "/public/" + files[4]));
  console.log(join(process.cwd() + "/public"));
  console.log(files);
}

////////////////// actions for Vercel build

import { put } from "@vercel/blob";

////////////////////////// for vercel image upload ///////////////////////
export async function uploadImageVercel(formData) {
  //deconstruct the form data submitted by the client
  const { model, price, colour, year, description, available, mileage } =
    Object.fromEntries(formData.entries());
  const fileArr = formData.getAll("files");
  console.log(fileArr);
  //create uniqe ID's for file names
  const uniqueFiles = fileArr.map(
    () => Math.random().toString(16).slice(2) + ".jpg"
  );

  const blobUrls = await Promise.all(
    fileArr.map(async (file, i) => {
      const blob = await put(uniqueFiles[i], file, { access: "public" });
      return blob.url;
    })
  );

  console.log(blobUrls);

  ///////////// Record a new entry in the DB ////////////////

  try {
    console.log("Connecting to server...");
    await client.connect();

    console.log("Connecting to collection...");
    const collection = db.collection("Cars");

    console.log("Inserting new document...");
    const doc = {
      files: blobUrls,
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
