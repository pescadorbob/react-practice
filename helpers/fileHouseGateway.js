import path from "path";
import fs from "fs";
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);

const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class HouseGateway {
  constructor(){

    this.jsonFile = path.resolve("./", "houses.json");
  }
  async getHouse (id) {
    const readFileData = await readFile(this.jsonFile);
    await delay(1000);
    const houses = JSON.parse(readFileData).houses;
    const house = houses.find((rec) => rec.id === id);
    return house;
  };
  async getHouses () {
    const readFileData = await readFile(this.jsonFile);
    await delay(1000);
    const houses = JSON.parse(readFileData).houses;
    return houses;
  };
  async save(house){
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
};
