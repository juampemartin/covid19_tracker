import React, { useEffect, useState } from "react";

import {
  Cards,
  RegionCards,
  Chart,
  RegionPicker,
  RegionsChart
} from "./components";
import { fetchRegionData, fetchData } from "./api/index";
import styles from "./App.module.css";
import image from "./images/image.png";

function App() {
  const [data, setData] = useState(null);
  const [region, setRegion] = useState("Spain");

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    };

    fetchAPI();
  }, []);

  const handleRegionChange = async (selected) => {
    if (selected === "Spain" || selected === "spain")
      setData(await fetchData());
    else {
      setData(await fetchRegionData(selected));
    }
    setRegion(selected);
  };

  return (
    <>
      <div className={styles.logoContainer}>
        <img className={styles.image} src={image} alt="Logo" />
        <h2>Coronavirus Tracking</h2>
      </div>
      <div className={styles.container}>
        {region === "Spain" ? (
          <Cards data={data} />
        ) : (
          <RegionCards data={data} />
        )}
        <RegionPicker handleRegionChange={handleRegionChange} />
        {region === "Spain" ? <Chart /> : <RegionsChart region={region} />}
      </div>
    </>
  );
}

export default App;
