import loadingStatus from "../helpers/loadingStatus";
import useHouses from "../hooks/useHouses";
import HouseRow from "./houseRow";
import LoadingIndicator from "./loadingIndicator";

const HouseList = () => {
  const { houses, addHouse, loadingState } = useHouses();

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  const emptyHouse = {
    id: 6,
    address: "32 Valley Way, New York",
    country: "USA",
    price: 1000000,
  }
  // const addHouse = () => {
  //   setHouses([
  //     ...houses,
  //     {
  //       id: 3,
  //       address: "32 Valley Way, New York",
  //       country: "USA",
  //       price: 1000000,
  //     },
  //   ]);
  // };

  const onNewHouseSubmitClick = () => {
    addHouse(emptyHouse);
  };
  return (
    <>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
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
