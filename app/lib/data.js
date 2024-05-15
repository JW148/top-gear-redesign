const { MongoClient, ObjectId } = require("mongodb");

//create a new MongoClient object and connect to the Stock DB
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Stock");

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
  try {
    console.log("Connecting to server...");
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connecting to collection...");
    const collection = db.collection("Ingredients");
    console.log("Querying collection...");
    const results = await collection.find({}).toArray();
    return results;
  } catch (err) {
    throw new Error("Failed to fetch data from collection: " + err);
  }
}
