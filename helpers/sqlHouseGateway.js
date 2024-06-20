import path from "path";
import fs from "fs";
const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

export default async function getHouse(id) {
  

  const dbInitResult = await initDb();
  console.log(`Init db result ${dbInitResult}`);
  const jsonFile = path.resolve("./", "houses.json");
  const readFileData = await readFile(jsonFile);
  await delay(1000);
  const houses = JSON.parse(readFileData).houses;
  const house = houses.find((rec) => rec.id === id);
  return house;
}

async function initDb() {
  return "success";
}
const db = new sqlite3.Database(":memory:");
console.log(`Initializing sqlite db`);
/*
      "id": 1,
      "address": "12 Valley of Kings, Geneva",
      "country": "Switzerland",
      "description": "A superb detached Victorian property on one of the town's finest roads, within easy reach of Barnes Village. The property has in excess of 6000 sq/ft of accommodation, a driveway and landscaped garden.",
      "price": 900000,
      "photo": "277667"

*/
db.serialize(() => {
  /*
  CREATE TABLE contacts (
    contact_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL UNIQUE
);
*/
  db.run(`CREATE TABLE house (
       id INTEGER PRIMARY KEY, 
       address TEXT NOT NULL, 
       country TEXT NOT NULL, 
       description TEXT NOT NULL,
       price NUMBER NOT NULL,
       photo NUMBER NOT NULL
      );`);

  const stmt = db.prepare(`INSERT INTO 
    house (id,address,country,description,price,photo)
     VALUES (?,?,?,?,?,?)`);
  for (let i = 0; i < 10; i++) {
    stmt.run(
      i,
      `address ${i}`,
      `country ${i}`,
      `description ${i}`,
      i * 100000,
      12345
    );
  }
  stmt.finalize();

  db.each("SELECT id,address FROM house", (err, row) => {
    console.log(`Row:${row.id}: ${row.address}`);
  });
});

db.close();
