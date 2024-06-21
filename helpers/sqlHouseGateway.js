import path from "path";
import fs from "fs";
const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);

const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class HouseGateway {
  constructor() {
    this.jsonFile = path.resolve("./", "houses.json");
    this.db = new sqlite3.Database(":memory:");
    this.initialized = false;
  }
  async getHouse(id, res) {
    const readFileData = await readFile(this.jsonFile);
    await delay(1000);
    const houses = JSON.parse(readFileData).houses;
    const house = houses.find((rec) => rec.id === id);
    return house;
  }
  async getHouses() {
    console.log("Fetching houses");
    await delay(1000);
    const houses = [];
    this.db.all(
      "SELECT id,address,country,description,price,photo FROM house",
      function (err, rows) {
        if (!err) {
          rows.forEach((row) => {
            houses.push({
              id: row.id,
              address: row.address,
              country: row.country,
              description: row.description,
              price: row.price,
              photo: row.photo,
            });
          });
        } else {
          console.log("Error!");
          throw new Error(`Error:${err}`);
        }
      }
    );
    await delay(1000);
    return houses;
  }

  async save(house) {
    const houses = await this.getHouses();
    house.id = Math.max(...houses.map((h) => h.id)) + 1;
    const newHousesArray = [...houses, house];
    writeFile(
      this.jsonFile,
      JSON.stringify(
        {
          houses: newHousesArray,
        },
        null,
        2
      )
    );
  }
  async initDb() {
    if (this.initialized) return;
    this.initialized = true;
    const readFileData = await readFile(this.jsonFile);

    const houses = JSON.parse(readFileData).houses;
    console.log(`Initializing sqlite db`);
    this.db.serialize(() => {
      this.db.run(`CREATE TABLE house (
           id INTEGER PRIMARY KEY, 
           address TEXT NOT NULL, 
           country TEXT NOT NULL, 
           description TEXT NOT NULL,
           price NUMBER NOT NULL,
           photo NUMBER NOT NULL
          );`);

      const stmt = this.db.prepare(`INSERT INTO 
        house (id,address,country,description,price,photo)
         VALUES (?,?,?,?,?,?)`);

      houses.forEach((element) => {
        stmt.run(
          element.id,
          element.address,
          element.country,
          element.description,
          element.price,
          element.photo
        );
      });
      stmt.finalize();

      this.db.each(
        "SELECT id,address,country,description,price,photo FROM house",
        (err, row) => {
          console.log(
            `Row:${row.id}: ${row.address} ${row.country} ${row.description} ${row.price} ${row.photo}`
          );
        }
      );
    });

    // this.db.close();
  }
}
