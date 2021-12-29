import React, { useEffect, useState } from "react"
import { Bar, Line } from "react-chartjs-2"

import styles from "./Chart.module.css"

const Chart = ({ data, country }) => {
  const barChart = data ? (
    <Bar
      data={{
        labels: ["Infectados", "Recuperados", "Muertes"],
        datasets: [
          {
            label: "Personas",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)"
            ],
            data: [data.confirmed, data.recovered, data.deaths]
          }
        ]
      }}
      options={{
        legend: { diplay: false },
        title: { display: true, text: `Estado actual en ${country}` }
      }}
    />
  ) : null

  return <div className={styles.container}>{barChart}</div>
}

export default Chart
