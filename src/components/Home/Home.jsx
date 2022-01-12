import React, { useState, useEffect, useContext } from "react";
import { Paper, Switch } from "@material-ui/core";

import { Chart, Cards, RegionCards, RegionPicker } from "../index";

import styles from "../../App.module.css";
import image from "../../images/image.png";
import { DataContext } from "../../api/data.context";

const Home = ({ handleThemeChange, toggleDark }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const { data, location, regionType } = useContext(DataContext);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const isMobile = width <= 768;

  return (
    <>
      <Paper style={{margin: "-1.5%", padding: "4%"}}>
      <div className={styles.logoContainer}>
        <img className={styles.image} src={image} alt="Logo" />
        <h2>Coronavirus Tracking</h2>
        <Switch
          checked={toggleDark}
          onChange={() => handleThemeChange()}
          name="toggleDark"
        />
      </div>
      <div className={styles.container}>
        {regionType === "country" ? (
          <Cards data={data} />
        ) : (
          <RegionCards data={data} />
        )}
        <RegionPicker />
        {isMobile ? null : <Chart region={location} />}
      </div>
      </Paper>
    </>
  );
};

export default Home;
