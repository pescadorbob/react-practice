import { useCallback, useState } from "react";
import loadingStatus from "../helpers/loadingStatus";

const useGetRequest = (url) => {
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);

  const get = useCallback(async (param) => {
    setLoadingState(loadingStatus.isLoading);
    try {
      const rsp = await fetch(`${url}?${param}`);
      const result = await rsp.json();
      setLoadingState(loadingStatus.loaded);
      return result;
    } catch {
      setLoadingState(loadingStatus.hasErrored);
    }
  }, [url]);
  return { get, loadingState };
};

export default useGetRequest;
