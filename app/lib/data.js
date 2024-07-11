"use server";

const { MongoClient, ObjectId } = require("mongodb");
import { unstable_noStore as noStore } from "next/cache";

//create a new MongoClient object and connect to the Stock DB
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("TopGear");

export async function checkDBConnection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function getData() {
  //noStore() Next.js API used to opt out of static rendering (making the components dynamic)
  noStore();
  try {
    console.log("Connecting to server...");
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connecting to collection...");
    const collection = db.collection("Cars");
    console.log("Querying collection...");
    const results = await collection.find({}).toArray();
    return results;
  } catch (err) {
    throw new Error("Failed to fetch data from collection: " + err);
  }
}

export async function getShowroomData() {
  //noStore() Next.js API used to opt out of static rendering (making the components dynamic)
  noStore();
  try {
    console.log("Connecting to server...");
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connecting to collection...");
    const collection = db.collection("Cars");
    console.log("Querying collection...");
    const results = await collection.find({ available: true }).toArray();
    return results;
  } catch (err) {
    throw new Error("Failed to fetch data from collection: " + err);
  }
}

export async function getListingById(id) {
  noStore();
  try {
    console.log("Connecting to server...");
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connecting to collection...");
    const collection = db.collection("Cars");
    console.log("Querying collection...");
    const result = await collection.findOne({ _id: new ObjectId(id) });
    const listing = {
      _id: result._id.toString(),
      files: result.files,
      model: result.model,
      price: result.price,
      colour: result.colour,
      year: result.year,
      mileage: result.mileage,
      description: result.description,
      available: result.available,
      date: result.date,
    };
    return listing;
  } catch (err) {
    throw new Error("Failed to fetch data from collection: " + err);
  }
}

export async function getUser(username) {
  noStore();
  try {
    console.log("Connecting to server");
    await client.connect();
    console.log("Connecting to collection...");
    const collection = db.collection("Users");
    console.log("Querying collection...");
    const result = await collection.findOne({ username: username });
    return result;
  } catch (err) {
    throw new Error("Failed to fetch data from collection: " + err);
  }
}

///////////////////////////// MYSQL //////////////////////////////////

import mysql from "mysql2/promise";

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

export async function getAdminDataSQL() {
  noStore();

  //connect to the DB
  const connection = await createConnection();

  try {
    //uses the JSON_ARRAYAGG to group the joined results in an array (as apposed to returning a new row for each image)
    const sql = `
    SELECT l.listingID, l.model, l.price, l.colour, l.year, l.mileage, l.description, l.available, l.createdAt, JSON_ARRAYAGG(images.imageID) AS images FROM listings as l
    INNER JOIN images
    ON l.listingID=images.listingID
    GROUP BY l.listingID
    `;
    //run the query
    const [rows, fields] = await connection.query(sql);

    //return the data to the client
    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}

export async function getShowroomDataSQL() {
  noStore();

  //connect to the DB
  const connection = await createConnection();

  try {
    //uses the JSON_ARRAYAGG to group the joined results in an array (as apposed to returning a new row for each image)
    const sql = `
    SELECT l.listingID, l.model, l.price, l.colour, l.year, l.mileage, l.description, l.available, l.createdAt, JSON_ARRAYAGG(images.imageID) AS images FROM listings as l
    INNER JOIN images
    ON l.listingID=images.listingID
    GROUP BY l.listingID;
    `;

    const [rows, fields] = await connection.query(sql);

    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}

export async function getListingByIdSQL(id) {
  noStore();

  //connect to the DB
  const connection = await createConnection();

  try {
    //write the quert to join the listing table entry with its corresponding entries in the images table
    //uses the JSON_ARRAYAGG to group the joined results in an array (as apposed to returning a new row for each image)
    const sql = `
    SELECT l.listingID, l.model, l.price, l.colour, l.year, l.mileage, l.description, l.available, l.createdAt, JSON_ARRAYAGG(images.imageID) AS images FROM listings as l
    INNER JOIN images
    ON l.listingID=images.listingID AND l.listingID = '${id}'
    GROUP BY l.listingID;
    `;

    const [rows, fields] = await connection.query(sql);

    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}

export async function getUserSQL(username) {
  noStore();
  const connection = await createConnection();
  try {
    const sql = `SELECT * FROM users WHERE username = '${username}';`;
    const [res, fields] = await connection.query(sql);
    return res[0];
  } catch (error) {
  } finally {
    await connection.end();
  }
}
