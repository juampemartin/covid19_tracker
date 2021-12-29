import axios from "axios"
import dayjs from "dayjs";

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
  const date = getCurrentDate()
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

export const fetchRegionData = async community => {
  const date = getCurrentDate()
  console.log(date)
  try {
    let country = "Spain"
    const res = await axios.get(`${specurl}/${date}/country/${country}`)
    let prop = res.data.dates
    let key = Object.keys(prop)[0]
    const region = prop[key].countries[country].regions.filter(
      region => region.id === community
    );
    return {
      id: region[0].id,
      lastUpdate: region[0].date,
      todayConfirmed: region[0].today_confirmed,
      newCases: region[0].today_new_confirmed,
      newDeaths: region[0].today_new_deaths,
      critical: region[0].today_new_intensive_care
    }
  } catch (error) {
    console.error("There was an error while trying to retrieve the data", error)
  }
}

const getCurrentDate = () => {
  let dateObj = dayjs()
  let month = dateObj.get("month") + 1;
  let day = dayjs().date();
  let year = dateObj.get("year")

  return year + "-" + month + "-" + day;
}
