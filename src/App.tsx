import React, { useEffect, useState } from "react";

import Papa from "papaparse";

// css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// components
import MakeCar from "./components/MakeCar";
import ModelCar from "./components/ModelCar";
import VehicleClass from "./components/VehicleClass";

const App = () => {
  type CSVData = Array<any> | null;
  const initialState: CSVData = null;
  // fetchedCSVData
  const [fetchedCSVData, setFetchedCSVData] = useState<CSVData>(initialState);

  const handleData = () => {
    // fetching csv data from public folder
    if (!fetchedCSVData) {
      fetch(`/data/data.csv`)
        .then((res) => res.text())
        .then((res) => {
          const csv: any = res;

          // convert csv to json
          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: function (results: any) {
              setFetchedCSVData(results.data);
            },
          });
        });
    }
  };

  useEffect(() => {
    // calling first when the app is mounting
    handleData();
  }, []);

  return (
    <div className="d-flex flex-column gap-3 justify-content-center height-90">
      <MakeCar fetchedCSVData={fetchedCSVData} />
      <ModelCar fetchedCSVData={fetchedCSVData} />
      <VehicleClass fetchedCSVData={fetchedCSVData} />
    </div>
  );
};

export default App;
