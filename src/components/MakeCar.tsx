import React, { useEffect, useState } from "react";

import ProgressData from "./ProgressData";

interface MakeCarProps {
  fetchedCSVData: any;
}

const MakeCar: React.FC<MakeCarProps> = ({ fetchedCSVData }) => {
  const [valid, setValid] = useState([]);
  const [mismatched, setMismatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [first2CarData, setFirst2CarData] = useState<any>([]);
  const [other, setOther] = useState(0);
  const [companyList, setCompanyList] = useState<any>({});

  const arrangeData = () => {
    const missingData: any = [];
    const mismatchedData: any = [];
    const validData: any = [];
    const companyListData: any = {};

    // valid , mismatched and missing data

    fetchedCSVData?.map((data: any) => {
      if (data["CO2 Emissions(g/km)"] == undefined || null || "") {
        missingData.push(data);
      } else if (typeof data["CO2 Emissions(g/km)"] != "string") {
        mismatchedData.push(data);
      } else {
        validData.push(data["CO2 Emissions(g/km)"]);
      }
    });

    fetchedCSVData?.map((data: any) => {
      const previousValue = companyListData[data["Make"]];

      if (previousValue === undefined) {
        // adding key and value
        companyListData[data["Make"]] = 1;
      } else {
        // add the value [length]
        companyListData[data["Make"]] = previousValue + 1;
      }
    });

    setValid(validData);
    setMismatched(mismatchedData);
    setMissing(missingData);
    setCompanyList(companyListData);

    // top2 data

    if (Object.keys(companyListData).length > 0) {
      const top2: any = Object.entries(companyListData)
        .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
        .slice(0, 2)
        .map(([label, value]) => ({ label, value }));

      setFirst2CarData(top2);

      const otherData = fetchedCSVData.length - top2[0]?.value - top2[1]?.value;

      setOther(otherData);
    }
  };

  useEffect(() => {
    arrangeData();
  }, [fetchedCSVData]);

  return (
    <div className="d-flex text-start gap-4 border-bottom pb-2">
      <div className="d-flex flex-1 flex-column">
        <div>
          <div className="fw-bold">A. Make</div>
          <div>Compnay of the vehicle</div>
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
            <div>Other({Object.keys(companyList).length - 2})</div>
            <div>
              {fetchedCSVData &&
                other &&
                ((other * 100) / fetchedCSVData.length).toFixed(2)}
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
          unique={Object.keys(companyList).length}
        />
      </div>
    </div>
  );
};

export default MakeCar;
