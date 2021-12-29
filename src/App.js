import React, { useEffect, useState } from "react"

import {
  Cards,
  RegionCards,
  Chart,
  CountryPicker,
  RegionsChart
} from "./components"
import { fetchRegionData, fetchData } from "./api/index"
import styles from "./App.module.css"
import image from "./images/image.png"

function App() {
  const [data, setData] = useState(null)
  const [country, setCountry] = useState("Spain")

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData())
    }

    fetchAPI()
  }, [])

  const handleCountryChange = async country => {
    if (country === "Spain") setData(await fetchData("Spain"))
    else {
      setData(await fetchRegionData(country))
    }
    setCountry(country)
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      {country === "Spain" ? (
        <Cards data={data} />
      ) : (
        <RegionCards data={data} />
      )}
      <CountryPicker handleCountryChange={handleCountryChange} />
      {country === "Spain" ? (
        <Chart data={data} country={country} />
      ) : (
        <RegionsChart data={data} country={country} />
      )}
      <Chart data={data} country={country} />
    </div>
  )
}

export default App
