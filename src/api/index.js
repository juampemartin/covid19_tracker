import axios from "axios";
import dayjs from "dayjs";
import config from "../api.config";

const regionUrl = "https://api.covid19tracking.narrativa.com/api";
const COUNTRY = "Spain";

export const fetchData = async () => {
  let date = getDate(0);

  if (dayjs().hour() < 7) {
    date = getDate(1);
  }

  try {
    const res = await axios.get(`${regionUrl}/${date}/country/${COUNTRY}`);

    let key = Object.keys(res.data.dates)[0];
    const data = res.data.dates[key].countries[COUNTRY]

    return {
      confirmed: data.today_confirmed,
      todayConfirmed: data.today_new_confirmed,
      deaths: data.today_deaths,
      critical: data.today_new_intensive_care,
      lastUpdate: date
    };
  } catch (error) {
    console.error("There was an error ", error);
  }
};

export const fetchRegions = async () => {
  let date = getDate(0);

  if (dayjs().hour() < 7) {
    date = getDate(1);
  }
  try {
    const res = await axios.get(`${regionUrl}/${date}/country/${COUNTRY}`);
    let key = Object.keys(res.data.dates)[0];

    return res.data.dates[key].countries[COUNTRY].regions.map(
      (region) => region.id
    );
  } catch (error) {
    console.error("There was an error ", error);
  }
};

export const fetchRegionData = async (community) => {
  let date = getDate(0);

  if (dayjs().hour() < 7) {
    date = getDate(1);
  }
  try {
    const response = await axios.get(
      `${regionUrl}/${date}/country/${COUNTRY}/region/${community}`
    );
    let key = Object.keys(response.data.dates)[0];
    const data = response.data.dates[key].countries[COUNTRY].regions[0];

    return {
      id: data.id,
      lastUpdate: data.date,
      todayConfirmed: data.today_confirmed,
      newCases: data.today_new_confirmed,
      newDeaths: data.today_new_deaths,
      critical: data.today_new_intensive_care
    };
  } catch (error) {
    console.error(
      "There was an error while trying to retrieve the data",
      error
    );
  }
};

export const fetchDailyData = async (region) => {
  let date = getDate(0);

  if (new Date().getHours() < 7) {
    date = getDate(1);
  }

  try {
    const res = await axios.get(`${regionUrl}/country/${COUNTRY}`, {
      params: { date_from: getDate(30), date_to: date }
    });

    let data = {};

    // Check if region is specified or not
    if (!region || region === "Spain") {
      data = Object.keys(res.data.dates).map((date, i) => {
        let key = Object.keys(res.data.dates)[i];
        return {
          date: date,
          confirmed: res.data.dates[key].countries[COUNTRY].today_confirmed,
          deaths: res.data.dates[key].countries[COUNTRY].today_deaths
        };
      });
    } else {
      data = Object.keys(res.data.dates).map((date, i) => {
        let key = Object.keys(res.data.dates)[i];
        const community = res.data.dates[key].countries[COUNTRY].regions.filter(
          (reg) => reg.id === region
        )[0];
        return {
          date: date,
          confirmed: community.today_confirmed,
          deaths: community.today_deaths
        };
      });
    }
    return data;
  } catch (error) {
    console.error("There was an error", error);
  }
};

const getDate = (modifier) => {
  let dateObj = dayjs();
  if (modifier !== 0) {
    dateObj = dateObj.add(-modifier, "day");
  }
  const date = dayjs(dateObj).format("YYYY-MM-DD");

  return date.toString();
};
