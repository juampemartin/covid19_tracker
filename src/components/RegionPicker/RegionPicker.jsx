import React, { useContext } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./RegionPicker.module.css";
import { RegionContext } from "../../api/region.context";

const RegionPicker = () => {
  const { regions, search, isLoading } = useContext(RegionContext);

  return (
    <FormControl classes={styles.formControl}>
      <NativeSelect
        defaultValue="Spain"
        onChange={(event) => {
          search(event.target.value);
        }}
      >
        <option value="Spain">España</option>
        {!isLoading
          ? regions.map((region, i) => (
              <option key={i} value={region}>
                {region.toUpperCase().replace(/_/g, " ")}
              </option>
            ))
          : null}
      </NativeSelect>
    </FormControl>
  );
};

export default RegionPicker;
