import path from "path";
import fs from "fs";
import config from "../../config";
const houseGateway = config().houseGateway;

const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);

export default async function handler(req, res) {
  const method = req?.method;

  switch (method) {
    case "GET":
      try {
        const houses = await houseGateway.getHouses();
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
        return;
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
