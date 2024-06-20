import path from "path";
import fs from "fs";
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

export default async function getHouse(id) {
  const jsonFile = path.resolve("./", "houses.json");
  const readFileData = await readFile(jsonFile);
  await delay(1000);
  const houses = JSON.parse(readFileData).houses;
  const house = houses.find((rec) => rec.id === id);
  return house;
}
