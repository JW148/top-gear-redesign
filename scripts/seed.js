///////////////////////////// MYSQL //////////////////////////////////

import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: "topgear",
});
console.log("Connnected");

export async function createListingsTable() {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS listings(
      id VARCHAR(36) PRIMARY KEY NOT NULL,
      model VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      colour VARCHAR(255) NOT NULL,
      year VARCHAR(255) NOT NULL,
      mileage INT NOT NULL,
      description TEXT NOT NULL,
      available BOOL NOT NULL,
      createdAt DATETIME NOT NULL
    );`;
    const createTable = await connection.query(sql);
    console.log(createTable);
  } catch (error) {
    console.log(error);
  }
}

export async function createImageTable() {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS images(
      imageID VARCHAR (255) PRIMARY KEY NOT NULL,
      listingID VARCHAR(36) NOT NULL
    )`;
    const createTable = await connection.query(sql);
    console.log(createTable);
  } catch (error) {
    console.log(error);
  }
}
