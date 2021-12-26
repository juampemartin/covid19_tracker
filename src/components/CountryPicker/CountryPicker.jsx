import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api/index";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries())
    }

    fetchAPI();
  }, [setCountries])

  return (
    <FormControl classes={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(event) => handleCountryChange(event.target.value) }> 
        <option value="Spain">Spain</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker
