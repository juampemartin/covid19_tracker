import axios from "axios"

const url = "https://covid19.mathdro.id/api"
const wUrl = "https://covid-19-data.p.rapidapi.com/country"

export const fetchData = async country => {
  try {
    const res = await axios.get(wUrl, {
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
      lastUpdate: res.data[0].lastUpdate,

    }
    return modifiedData;
  } catch (error) {}
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`)

    const modifiedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }))

    return modifiedData
  } catch (error) {}
}

export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`)

    return countries.map(country => country.name)
  } catch (error) {}
}
