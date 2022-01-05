import React from "react";

import { RegionContextProvider } from "./api/region.context";
import { DataContextProvider } from "./api/data.context";
import Home from "./components/Home/Home";

function App() {
  return (
    <RegionContextProvider>
      <DataContextProvider>
        <Home />
      </DataContextProvider>
    </RegionContextProvider>
  );
}

export default App;
