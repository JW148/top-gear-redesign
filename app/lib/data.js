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

export async function getListingById(id) {
  noStore();
  try {
    console.log("Connecting to server...");
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connecting to collection...");
    const collection = db.collection("Cars");
    console.log("Querying collection...");
    const results = await collection.findOne({ _id: new ObjectId(id) });
    return results;
  } catch (err) {
    throw new Error("Failed to fetch data from collection: " + err);
  }
}
