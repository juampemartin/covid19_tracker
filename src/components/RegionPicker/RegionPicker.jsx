import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./RegionPicker.module.css";
import { fetchRegions } from "../../api/index";

const RegionPicker = ({ handleRegionChange }) => {
  const [regions, setRegions] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setRegions(await fetchRegions())
    }

    fetchAPI();
  }, [setRegions])

  return (
    <FormControl classes={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(event) => handleRegionChange(event.target.value) }> 
        <option value="Spain">España</option>
        {regions.map((region, i) => <option key={i} value={region}>{region.toUpperCase()}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default RegionPicker
