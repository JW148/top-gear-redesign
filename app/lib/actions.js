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

////////////////// ACTIONS FOR VERCEL BUILD //////////////////////////////////////

import { put, del } from "@vercel/blob";

////////////////////////// for vercel image upload ///////////////////////
export async function vercelUpload(formData) {
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

export async function vercelEdit(formData) {
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
  console.log(fileArr);
  //create uniqe ID's for file names
  const uniqueFiles = fileArr.map(
    () => Math.random().toString(16).slice(2) + ".jpg"
  );

  //////////// new image uploads to vercel blob ////////////////

  const blobUrls = await Promise.all(
    fileArr.map(async (file, i) => {
      const blob = await put(uniqueFiles[i], file, { access: "public" });
      return blob.url;
    })
  );

  // /////////////////// delete fziles from vercel blob that were marked for deletion /////////////////////
  try {
    //first check if there are files to delete
    if (filesToDelete[0] !== "") {
      console.log("Deleting files...");
      filesToDelete.forEach(async (file) => {
        await del(file);
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
      fileArr[0].size !== 0 ? filesToKeep.concat(blobUrls) : filesToKeep;

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

import sharp from "sharp";

export async function compress(state, formData) {
  const fileArr = formData.getAll("files");
  fileArr.forEach(async (file) => {
    //read file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //compress file
    const compressedImg = await sharp(buffer)
      .jpeg({ quality: 30 })
      .withMetadata()
      .toBuffer();
    //write file
    const path = join(process.cwd() + "/public/compressed/" + file.name);
    await writeFile(path, compressedImg);
    console.log(`Open ${path} to view the uploaded file`);
  });
  //   console.log(formData.getAll("files")[0].size);
  //   const file = formData.getAll("files")[0];
  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);

  //   const compressedImage = await sharp(buffer).jpeg({ quality: 60 }).toBuffer();
  //   console.log(compressedImage.byteLength);
  //   // const path = join(process.cwd() + "/public/" + "compressed.jpeg");
  //   // await writeFile(path, compressedImage);
  //   // console.log(`Open ${path} to view the uploaded file`);
  //   return { data: compressedImage.byteLength };
}

//////////////////////////////////// MYSQL ///////////////////////////////////////////

import mysql from "mysql2/promise";
import { randomUUID } from "crypto";

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
    });
    return connection;
  } catch (error) {
    console.log("Error connecting to the DB");
    console.error(error);
  }
}

export async function createListing(formData) {
  //deconstruct the form data submitted by the client
  const { model, price, colour, year, description, available, mileage } =
    Object.fromEntries(formData.entries());
  //get the files that were uploaded by the client
  const fileArr = formData.getAll("files");

  //create a UUID id for the listing
  const id = randomUUID();

  //create a new listing entry on the DB
  await newListingEntry(
    id,
    model,
    price,
    colour,
    year,
    description,
    available,
    mileage
  );

  //compress + rename the uploaded images + create a new image entry in the DB
  fileArr.forEach(async (file) => {
    //compress and rename
    const result = await handleImage(file);
    //create new image entry
    await newImageListing(result.fileName, id);
  });
  revalidatePath("/admin");
  redirect("/admin");
}

//creates a new listing entry in the listings table
async function newListingEntry(
  id,
  model,
  price,
  colour,
  year,
  description,
  available,
  mileage
) {
  const connection = await createConnection();

  try {
    //first, create a new listing entry

    const sql = `
      INSERT INTO listings (listingID, model, price, colour, year, description, available, mileage, createdAt) VALUES ('${id}', '${model}', '${parseInt(
      price
    )}', '${colour}', '${year}', '${description}', '${
      available ? 1 : 0
    }', '${parseInt(mileage)}', '${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}')
    `;
    //complete the query
    await connection.query(sql);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}

async function newImageListing(imageID, listingID) {
  const connection = await createConnection();
  try {
    const sql = `
      INSERT INTO images (imageID, listingID) VALUES ('${imageID}', '${listingID}')
    `;
    await connection.query(sql);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}

async function handleImage(file) {
  try {
    //create a unique name for the file
    const fileName = Math.random().toString(16).slice(2) + ".jpg";
    //read file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //compress file
    const compressedImg = await sharp(buffer)
      .jpeg({ quality: 30 })
      .withMetadata()
      .toBuffer();
    //write file
    const path = join(process.cwd() + "/public/images/" + fileName);
    await writeFile(path, compressedImg);
    return { fileName: fileName, path: path };
  } catch (error) {
    console.log("Error writing file!");
    console.error(error);
  }
}

export async function deleteListingSQL(id) {
  const connection = await createConnection();
  try {
    //first delete all the images associated with the specified listing on the local disk
    const sql1 = `SELECT JSON_ARRAYAGG(images.imageID) AS images FROM images WHERE images.listingID = '${id}';`;
    const [rows, fields] = await connection.query(sql1);
    let images = rows[0].images;
    //delete all images on disk
    images.forEach(async (file) => {
      await unlink(join(process.cwd() + "/public/images/" + file));
    });

    //then delete the listing entry from the listings table
    //NOTE: we don't explicitly need to delete the associated images from the images table seperately because of the foreign key relation being set to cascade
    const sql2 = `DELETE FROM listings WHERE listings.listingID = '${id}';`;
    await connection.query(sql2);
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}

export async function editListingSQL(formData) {
  //get the updated form data
  const {
    listingID,
    model,
    price,
    colour,
    year,
    description,
    available,
    mileage,
    files_to_keep,
    files_to_delete,
  } = Object.fromEntries(formData.entries());

  //////////////////// update the images table with in the new specified order ////////////////////
  const filesToKeep = files_to_keep.split(",");
  console.log(filesToKeep);
  //append the listingID to the imageID so they can easily be entered into the images table
  const fileEntries = filesToKeep.map((file) => {
    return [file, listingID];
  });
  console.log(fileEntries);
  await updateImages(filesToKeep, fileEntries);

  ///////////////// write new files and create DB entries //////////////////////

  const newFiles = formData.getAll("files");

  //compress + rename the new images + create a new image entry in the DB
  //NOTE: file.size = 0 indicates no new files uploaded
  if (newFiles[0].size !== 0) {
    newFiles.forEach(async (file) => {
      //compress and rename
      const result = await handleImage(file);
      //create new image entry
      await newImageListing(result.fileName, listingID);
    });
  }

  /////////////// delete files from local disk and DB entries /////////////////

  //files_to_delete is returned as a single string so they need to be split and turned into an array
  //NOTE: if there are no files being deleted, the following will still produce an array of length 1, e.g. ['']
  const filesToDelete = files_to_delete.split(",");

  //NOTE: filesToDelete[0] = '' indicates there are no files to delete
  if (filesToDelete[0] !== "") {
    handleDelete(filesToDelete);
  }

  /////////////////// update the listing in the DB /////////////////////
  const connection = await createConnection();
  try {
    const sql = `
      UPDATE listings SET model = '${model}', price = '${parseInt(
      price
    )}', colour = '${colour}', year = '${year}', description = '${description}', available = '${
      available ? 1 : 0
    }', mileage = '${parseInt(
      mileage
    )}' WHERE listings.listingID = '${listingID}';
    `;
    await connection.query(sql);
  } catch (error) {
  } finally {
    await connection.end();
  }
  revalidatePath("/admin");
  redirect("/admin");
}

async function handleDelete(files) {
  const connection = await createConnection();
  try {
    //first delete the file entries in the db
    const sql = `DELETE FROM images WHERE images.imageID IN (?)`;
    const [result, fields] = await connection.query(sql, [files]);

    //then delete the files from the local disk
    files.forEach(async (file) => {
      await unlink(join(process.cwd() + "/public/images/" + file));
    });
  } catch (error) {
    console.log("Error deleting files!");
    console.error(error);
  } finally {
    connection.end();
  }
}

//rewrite the images in the images table in the new specified order
async function updateImages(files, fileEntries) {
  const connection = await createConnection();
  try {
    //first delete all the entries
    const sql = `DELETE FROM images WHERE images.imageID IN (?)`;
    await connection.query(sql, [files]);

    const sql2 = "INSERT INTO images (imageID, listingID) VALUES ?";
    await connection.query(sql2, [fileEntries]);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}
