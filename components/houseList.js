import loadingStatus from "../helpers/loadingStatus";
import useHouses from "../hooks/useHouses";
import HouseRow from "./houseRow";
import LoadingIndicator from "./loadingIndicator";
import { act } from 'react-dom/test-utils';

const HouseList = () => {
  const { houses, addHouse, loadingState, filterHouse, minPrice, setMinPrice } =
    useHouses();
  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const emptyHouse = {
    id: 6,
    description: "Beautiful home in Oregon",
    address: "32 Valley Way, New York",
    country: "USA",
    price: 1000000,
    photo: 164558,
  };

  const onNewHouseSubmitClick = () => {
    addHouse(emptyHouse);
  };
  return (
    <>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
        <input
          id="price"
          className="h-100"
          type="text"
          value={minPrice}
          onChange={(e) => setMinPrice( e.target.value )}
          placeholder="MinPrice"
        ></input>
        <div className="col-2">
          <button className="btn btn-primary" onClick={filterHouse}>
            Add
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Country</th>
            <th>Asking Price</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((h) => (
            <HouseRow key={h.id} house={h} />
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={onNewHouseSubmitClick}>
        Add
      </button>
    </>
  );
};

export default HouseList;
