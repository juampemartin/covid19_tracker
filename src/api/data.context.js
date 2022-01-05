import React, { createContext, useContext, useEffect, useState } from "react";

import { fetchData, fetchRegionData } from "./index";
import { RegionContext } from "./region.context";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { location, regionType } = useContext(RegionContext);

  useEffect(() => {
    async function retrieveData(loc) {
      setIsLoading(true);

      switch (regionType) {
        case "country":
          await fetchData()
            .then((result) => {
              setData(result);
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              setError(err);
            });
          break;
        case "province":
          await fetchRegionData(loc)
            .then((result) => {
              setData(result);
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              setError(err);
            });
          break;
        default:
          console.log("Default case triggered");
          break;
      }
    }
    retrieveData(location);
  }, [location, regionType]);

  return (
    <DataContext.Provider
      value={{
        data,
        location,
        isLoading,
        regionType,
        error
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
