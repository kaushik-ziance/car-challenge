import React, { useEffect, useState } from "react";
import ProgressData from "./ProgressData";

interface ModelCarProps {
  fetchedCSVData: any;
}

const ModelCar: React.FC<ModelCarProps> = ({ fetchedCSVData }) => {
  const [valid, setValid] = useState([]);
  const [mismatched, setMismatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [first2CarData, setFirst2CarData] = useState<any>([]);
  const [modelList, setModelList] = useState<any>({});

  const arrangeData = () => {
    // valid , mismatched and missing data
    const missingData: any = [];
    const mismatchedData: any = [];
    const validData: any = [];

    // Car Model List
    const modelListData: any = {};

    // Finding CO2 Emissions(g/km) Data is valid
    fetchedCSVData?.map((data: any) => {
      if (data["CO2 Emissions(g/km)"] == undefined || null || "") {
        missingData.push(data["CO2 Emissions(g/km)"]);
      } else if (typeof data["CO2 Emissions(g/km)"] != "string") {
        mismatchedData.push(data["CO2 Emissions(g/km)"]);
      } else {
        validData.push(data["CO2 Emissions(g/km)"]);
      }
    });

    // Finding Total Models and their length
    fetchedCSVData?.map((data: any) => {
      const previousValue = modelListData[data["Model"]];

      if (previousValue === undefined) {
        // adding key and value
        // If the value is not exist then create new value
        modelListData[data["Model"]] = 1;
      } else {
        // add the value [length]
        // If the value is exist then increase their length
        modelListData[data["Model"]] = previousValue + 1;
      }
    });

    setValid(validData);
    setMismatched(mismatchedData);
    setMissing(missingData);
    setModelList(modelListData);

    // top2 data
    // Finding top2 Model's list

    if (Object.keys(modelListData).length > 0) {
      const top2: any = Object.entries(modelListData)
        .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
        .slice(0, 1)
        .map(([label, value]) => ({ label, value }));

      setFirst2CarData(top2);
    }
  };

  useEffect(() => {
    // Arrange the CSV data when the value in dependies changed
    arrangeData();
  }, [fetchedCSVData]);

  return (
    <div className="d-flex text-start gap-4 border-bottom pb-2">
      <div className="d-flex flex-1 flex-column">
        <div>
          <div className="fw-bold">A. Model</div>
          <div>Car Model</div>
        </div>

        <div className="mt-5">
          <div className="fs-1 fw-bold text-primary">
            {Object.keys(modelList).length}
          </div>
          <div className="fw-bold">unique values</div>
        </div>
      </div>

      <div className="flex-2">
        <ProgressData
          fetchedCSVData={fetchedCSVData}
          valid={valid}
          mismatched={mismatched}
          missing={missing}
          first2CarData={first2CarData}
          unique={Object.keys(modelList).length}
        />
      </div>
    </div>
  );
};

export default ModelCar;
