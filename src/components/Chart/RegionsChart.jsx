import React from "react"
import { Bar } from "react-chartjs-2"

import styles from "./Chart.module.css"

const RegionsChart = ({ data, country }) => {
  const barChart = data ? (
    <Bar
      data={{
        labels: ["Infectados", "Nuevos Casos", "Muertes"],
        datasets: [
          {
            label: "Personas",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)"
            ],
            data: [data.todayConfirmed, data.newCases, data.newDeaths]
          }
        ]
      }}
      options={{
        legend: { diplay: false },
        title: { display: true, text: `Estado actual en ${country.toUpperCase()}` }
      }}
    />
  ) : null

  return (
    <div className={styles.container}>{barChart}</div>
  )
}

export default RegionsChart
