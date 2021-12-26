import React, { useEffect, useState } from "react"

import { Cards, Chart, CountryPicker } from "./components"
import { fetchData } from "./api/index"
import styles from "./App.module.css"
import image from "./images/image.png";

function App() {
  const [data, setData] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData())
    }

    fetchAPI()
  }, [])

  const handleCountryChange = async country => {
    setData(await fetchData(country))
    setCountry(country)
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  )
}

export default App
