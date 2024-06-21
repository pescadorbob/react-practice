import { HouseGateway } from "../helpers/sqlHouseGateway";

class Configuration {
  constructor() {
    this.houseGateway = new HouseGateway();
    this.houseGateway.initDb();
  }
}
const _config = new Configuration();

export default function config() {
  return _config;
}
