import React, { useEffect, useState } from "react";

// components
import ProgressData from "./ProgressData";

interface VehicleClassProps {
  fetchedCSVData: any;
}

const VehicleClass: React.FC<VehicleClassProps> = ({ fetchedCSVData }) => {
  const [valid, setValid] = useState([]);
  const [mismatched, setMismatched] = useState([]);
  const [missing, setMissing] = useState([]);

  const [first2CarData, setFirst2CarData] = useState<any>([]);
  const [other, setOther] = useState(0);
  const [vehicleClassList, setVehicleClassList] = useState<any>({});

  const arrangeData = () => {
    // valid , mismatched and missing data

    const missingData: any = [];
    const mismatchedData: any = [];
    const validData: any = [];

    // Vehicle Class List
    const vehicleClassListData: any = {};

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

    // Finding Vehicle Class and their length
    fetchedCSVData?.map((data: any) => {
      const previousValue = vehicleClassListData[data["Vehicle Class"]];

      if (previousValue === undefined) {
        // adding key and value
        // If the value is not exist then create new value
        vehicleClassListData[data["Vehicle Class"]] = 1;
      } else {
        // add the value [length]
        // If the value is exist then increase their length
        vehicleClassListData[data["Vehicle Class"]] = previousValue + 1;
      }
    });

    setValid(validData);
    setMismatched(mismatchedData);
    setMissing(missingData);
    setVehicleClassList(vehicleClassListData);

    // top2 data
    // Finding Vehicle Class list

    if (Object.keys(vehicleClassListData).length > 0) {
      const top2: any = Object.entries(vehicleClassListData)
        .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
        .slice(0, 2)
        .map(([label, value]) => ({ label, value }));

      setFirst2CarData(top2);

      const otherData = fetchedCSVData.length - top2[0]?.value - top2[1]?.value;

      setOther(otherData);
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
          <div className="fw-bold">A. Vehicle Class</div>
          <div>
            class of vehicle depending on their utility, capacity and weight
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          {fetchedCSVData && first2CarData && (
            <div className="d-flex w-full justify-content-between">
              <div>{first2CarData[0]?.label}</div>
              <div className="fw-bold text-primary">
                {(
                  (first2CarData[0]?.value * 100) /
                  fetchedCSVData.length
                ).toFixed(2)}
                %
              </div>
            </div>
          )}

          {fetchedCSVData && first2CarData && (
            <div className="d-flex w-full justify-content-between">
              <div>{first2CarData[1]?.label}</div>
              <div className="fw-bold text-primary">
                {(
                  (first2CarData[1]?.value * 100) /
                  fetchedCSVData.length
                ).toFixed(2)}
                %
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between text-muted fs-6">
            <div>Other({Object.keys(vehicleClassList).length - 2})</div>
            <div>
              {fetchedCSVData &&
                other &&
                ((other / fetchedCSVData.length) * 100).toFixed(2)}
              %
            </div>
          </div>
        </div>
      </div>

      <div className="flex-2">
        <ProgressData
          fetchedCSVData={fetchedCSVData}
          valid={valid}
          mismatched={mismatched}
          missing={missing}
          first2CarData={first2CarData}
          unique={Object.keys(vehicleClassList).length}
        />
      </div>
    </div>
  );
};

export default VehicleClass;
