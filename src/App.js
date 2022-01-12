import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core";

import { RegionContextProvider } from "./api/region.context";
import { DataContextProvider } from "./api/data.context";
import Home from "./components/Home/Home";

function App() {
  const [toggleDark, settoggleDark] = useState(false);

  const handleThemeChange = () => {
    settoggleDark(!toggleDark);
  };

  const theme = createTheme({
    palette: {
      type: toggleDark ? "dark" : "light"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <RegionContextProvider>
        <DataContextProvider>
          <Home handleThemeChange={handleThemeChange} toggleDark={toggleDark} />
        </DataContextProvider>
      </RegionContextProvider>
    </ThemeProvider>
  );
}

export default App;
