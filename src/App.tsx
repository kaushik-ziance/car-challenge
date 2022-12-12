import React, { useEffect, useState } from "react";

import Papa from "papaparse";
import axios from 'axios';

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
  const [fetchedCSVData, setFetchedCSVData] = useState<CSVData>(initialState);

  const handleData = () => {
    // Fetching CSV file from Public folder :

    if (!fetchedCSVData) {
      axios.get(`/data/data.csv`)
        .then((res) => {                        
          const csv: any = (res.data);

          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: function (results: any) {              
              setFetchedCSVData((results.data));
            },
          });
        });
    }
  };

  useEffect(() => {
    // Fetching CSV Data first when the app is mounting
    // This file is mounted first
    handleData();
  }, []);

  return (
    <div className="d-flex flex-column gap-3 justify-content-center height-90">
      {/* Pass fetchedCSVData into subcomponent  */}
      <MakeCar fetchedCSVData={fetchedCSVData} />
      <ModelCar fetchedCSVData={fetchedCSVData} />
      <VehicleClass fetchedCSVData={fetchedCSVData} />
    </div>
  );
};

export default App;
