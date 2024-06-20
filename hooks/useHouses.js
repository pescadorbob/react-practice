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
  
  const postBid = async (bid) => {
    await fetch(`/api/bids/${bid.houseId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    });
  };

  const addBid = (bid) => {
    postBid(bid);
    setBids([...bids, bid]);
  };

  return { houses, setHouses, loadingState };
};

export default useHouses;
