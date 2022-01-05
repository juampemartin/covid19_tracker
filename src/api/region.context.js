import React, { createContext, useContext, useEffect, useState } from "react";

import { fetchRegions } from "./index";

export const RegionContext = createContext();

export const RegionContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("Spain");
  const [location, setLocation] = useState("Spain");
  const [regions, setRegions] = useState([]);
  const [regionType, setRegionType] = useState("country");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onChange = (selected) => {
    setLocation(selected);
    selected.toLowerCase() != "spain" ? setRegionType("province") : setRegionType("country");
  };

  useEffect(() => {
    if (!keyword.length) {
      return;
    }
    fetchRegions()
      .then((result) => {
        setIsLoading(false);
        setRegions(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  return (
    <RegionContext.Provider
      value={{
        isLoading,
        error,
        location,
        regions,
        search: onChange,
        keyword,
        regionType
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};
