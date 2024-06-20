import path from "path";
import fs from "fs";
import { HouseGateway } from "../../../helpers/fileHouseGateway";

const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const hg = new HouseGateway();

export default async function handler(req, res) {
  const method = req?.method;

  const houses = await hg.getHouses();

  switch (method) {
    case "GET":
      try {
        if (!houses) {
          res.status(404).send("Error: Request failed with status code 404");
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify(houses, null, 2));
          console.log("GET /api/houses  status: 200");
        }
      } catch (e) {
        console.log("/api/houses error:", e);
      }
      break;

    case "POST":
      try {
        const recordFromBody = req?.body;
        console.log(`RecordFromBody:[${recordFromBody}]`);
        // HouseGateway.save(house);
        recordFromBody.id = Math.max(...houses.map((h) => h.id)) + 1;
        const newHousesArray = [...houses, recordFromBody];
        writeFile(
          jsonFile,
          JSON.stringify(
            {
              houses: newHousesArray,
            },
            null,
            2
          )
        );
        res.status(200).json(recordFromBody);
        console.log(`POST /api/houses status: 200`);
      } catch (e) {
        console.log("/api/houses POST error:", e);
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
