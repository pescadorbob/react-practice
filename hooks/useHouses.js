import { useEffect, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";
import useGetRequest from "./useGetRequest";

const useHouses = () => {
  const [houses, setHouses] = useState([]);
  const { get, loadingState } = useGetRequest("/api/houses");

  const fetchHouses = async () => {
    const houses = await get();
    setHouses(houses);
  };
  useEffect(() => {
    console.log("Fetch Houses");
    fetchHouses();
  }, [get]);

  const postHouse = async (house) => {
    await fetch(`/api/houses/${house.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(house),
    });
  };

  const  addHouse = async (house) => {
    await postHouse(house);
    fetchHouses();
    
  };

  return { houses, addHouse, loadingState };
};

export default useHouses;
