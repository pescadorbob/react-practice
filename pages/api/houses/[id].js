import { getHouse } from "../../../helpers/fileHouseGateway";

export default async function handler(req, res) {
  const id = parseInt(req?.query?.id);
  const house = await getHouse(id);
  if (house) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(house);
  } else {
    res.status(404).send("house not found");
  }
  console.log(`GET /api/houses/${id} status: 200`);
}
