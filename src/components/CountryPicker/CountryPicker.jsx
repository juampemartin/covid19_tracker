import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";
import { fetchRegions } from "../../api/index";

const CountryPicker = ({ handleCountryChange }) => {
  const [regions, setRegions] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setRegions(await fetchRegions())
    }

    fetchAPI();
  }, [setRegions])

  return (
    <FormControl classes={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(event) => handleCountryChange(event.target.value) }> 
        <option value="Spain">Spain</option>
        {regions.map((region, i) => <option key={i} value={region}>{region.toString().toUpperCase()}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker
