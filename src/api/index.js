import axios from "axios"
import dayjs from "dayjs"

const url = "https://covid-19-data.p.rapidapi.com"
const specurl = "https://api.covid19tracking.narrativa.com/api"
const countriesUrl = "https://covid19.mathdro.id/api" // TODO: This has to be deleted and use the above API

export const fetchData = async country => {
  try {
    const res = await axios.get(`${url}/country`, {
      params: { name: !country ? "Spain" : country },
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "b18fd1e31emshb67c42ae13b5fe5p1a05d7jsn83985626f8ac"
      }
    })
    const modifiedData = {
      confirmed: res.data[0].confirmed,
      recovered: res.data[0].recovered,
      deaths: res.data[0].deaths,
      critical: res.data[0].critical,
      lastUpdate: res.data[0].lastUpdate
    }
    return modifiedData
  } catch (error) {
    console.error("There was an error while trying to fetch the data", error)
  }
}

export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${countriesUrl}/countries`)

    return countries.map(country => country.name)
  } catch (error) {
    console.error("Eror while trying to fetch the data", error)
  }
}

export const fetchRegions = async country => {
  let date = getCurrentDate()

  if (new Date().getHours() < 7) {
    date = getCurrentDate(1)
  }

  try {
    if (!country) country = "Spain"
    const res = await axios.get(`${specurl}/${date}/country/${country}`)
    let prop = res.data.dates
    let key = Object.keys(prop)[0]

    return prop[key].countries[country].regions.map(region => region.id)
  } catch (error) {
    console.error("There was an error while trying to fetch the data")
  }
}

export const fetchRegionData = async (community, country = "Spain") => {
  const date = getCurrentDate()
  try {
    const response = await axios.get(
      `${specurl}/${date}/country/${country}/region/${community}`
    )
    let key = Object.keys(response.data.dates)[0]
    const data = response.data.dates[key].countries[country].regions[0]

    return {
      id: data.id,
      lastUpdate: data.date,
      todayConfirmed: data.today_confirmed,
      newCases: data.today_new_confirmed,
      newDeaths: data.today_new_deaths,
      critical: data.today_new_intensive_care,
      hospitalized: data.today_new_total_hospitalised_patients
    }
  } catch (error) {
    console.error("There was an error while trying to retrieve the data", error)
  }
}

export const fetchDailyData = async (country = "spain") => {
  let date = getCurrentDate()

  if (new Date().getHours() < 7) {
    date = getCurrentDate(1)
  }

  try {
    const res = await axios.get(`${specurl}/country/spain`, {
      params: { date_from: "2021-12-01", date_to: date }
    })
    const data = Object.keys(res.data.dates).map((date, i) => {
      let key = Object.keys(res.data.dates)[i]
      return {
        date: date,
        confirmed: res.data.dates[key].countries.Spain.today_confirmed,
        deaths: res.data.dates[key].countries.Spain.today_deaths,
      }
    })
    return data;
  } catch (error) {
    console.error("Error", error)
  }
}

const getCurrentDate = (yest = 0) => {
  let dateObj = dayjs()
  let month = dateObj.get("month") + 1
  let day = dayjs().date() - 1
  let year = dateObj.get("year")

  return year + "-" + month + "-" + day
}
