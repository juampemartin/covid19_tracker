import React, {useState, useEffect} from "react";
import { Line } from "react-chartjs-2";

import styles from "./Chart.module.css";
import { fetchDailyData } from "../../api/index";

const RegionsChart = ({ region }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData(region));
    };
    fetchAPI();
  }, [region]);

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(data => data.date),
        datasets: [
          {
            data: dailyData.map(data => data.confirmed),
            label: "Infectados",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75,192,192,1)",
            fill: true
          },
          {
            data: dailyData.map(data => data.deaths),
            label: "Muertes",
            borderColor: "#742774",
            backgroundColor: "rgba(116, 39, 116, 0.5)",
            fill: true
          }
        ]
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default RegionsChart;
