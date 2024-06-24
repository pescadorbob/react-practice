import { useEffect, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";
import useGetRequest from "./useGetRequest";
import { act } from 'react-dom/test-utils';

const useHouses = () => {
  const [houses, setHouses] = useState([]);
  const [minPrice, setMinPrice] = useState([100000])
  const { get, loadingState } = useGetRequest("/api/houses");

  const fetchHouses = async () => {
    const houses = await get(`minPrice=${minPrice}`);
    act(() =>{      
      setHouses(houses);
    })
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
  const filterHouse = async () => {
    setMinPrice(minPrice);
    fetchHouses();
  }

  return { houses, addHouse, loadingState , filterHouse, minPrice, setMinPrice};
};

export default useHouses;
