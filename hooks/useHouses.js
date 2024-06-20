import { useEffect, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";
import useGetRequest from "./useGetRequest";

const useHouses = () => {
  const [houses, setHouses] = useState([]);
  const { get, loadingState } = useGetRequest("/api/houses");

  useEffect(() => {
    const fetchHouses = async () => {
      const houses = await get();
      setHouses(houses);
    };
    fetchHouses();
  }, [get]);

  const postHouse = async (house) => {
    console.log(house);
    console.log(`House:[${house}]`);
    await fetch(`/api/houses/${house.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(house),
    });
  };

  const addHouse = (house) => {
    postHouse(house);
    setHouses([...houses, house]);
  };

  return { houses, addHouse, loadingState };
};

export default useHouses;
