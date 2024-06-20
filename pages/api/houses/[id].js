// import { HouseGateway } from "../../../helpers/fileHouseGateway";
import { HouseGateway } from "../../../helpers/sqlHouseGateway";
const houseGateway = new HouseGateway();
houseGateway.initDb();

export default async function handler(req, res) {
  const id = parseInt(req?.query?.id);
  const method = req?.method;

  switch (method) {
    case "GET":
      const house = await houseGateway.getHouse(id);
      if (house) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(house);
      } else {
        res.status(404).send("house not found");
      }
      console.log(`GET /api/houses/${id} status: 200`);
      break;
    case "POST":
      const recordFromBody = req?.body;
      await houseGateway.save(recordFromBody);
      res.status(200).json(recordFromBody);
      console.log(`POST /api/houses/${id} status: 200`);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
