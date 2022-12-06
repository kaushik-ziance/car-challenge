import React, { useEffect, useState } from "react";

import { Progress } from "reactstrap";

interface ProgressDataProps {
  fetchedCSVData: any;
  valid: any;
  mismatched: any;
  missing: any;
  first2CarData: any;
  unique: number;
}

const ProgressData: React.FC<ProgressDataProps> = ({
  fetchedCSVData,
  valid,
  mismatched,
  missing,
  first2CarData,
  unique,
}) => {
  const [validDataPercentage, setValidDataPercentage] = useState(0);
  const [mismatchedDataPercentage, setMismatchedDataPercentage] = useState(0);
  const [missingDataPercentage, setMissingDataPercentage] = useState(0);

  const handlePercentageData = () => {
    // converting given value into percentage
    if (fetchedCSVData) {
      setValidDataPercentage((valid.length / fetchedCSVData.length) * 100);
      setMismatchedDataPercentage(
        (mismatched.length / fetchedCSVData.length) * 100
      );
      setMissingDataPercentage((missing.length / fetchedCSVData.length) * 100);
    }
  };

  useEffect(() => {
    // Change the Percentage data when the value in dependies changed
    handlePercentageData();
  }, [
    fetchedCSVData,
    validDataPercentage,
    mismatchedDataPercentage,
    missingDataPercentage,
  ]);

  const dataTransparency = [
    {
      label: "Valid",
      color: "bg-success",
      value: valid.length,
      valueInPercentage: validDataPercentage,
    },
    {
      label: "Mismatched",
      color: "bg-warning",
      value: mismatched.length,
      valueInPercentage: mismatchedDataPercentage,
    },
    {
      label: "Missing",
      color: "bg-danger",
      value: missing.length,
      valueInPercentage: missingDataPercentage,
    },
  ];

  return (
    <div>
      <Progress multi>
        <Progress bar color="success" value={validDataPercentage} />
        <Progress bar color="warning" value={mismatchedDataPercentage} />
        <Progress bar color="danger" value={missingDataPercentage} />
      </Progress>

      {dataTransparency.map((data: any) => {
        return (
          <div className="d-flex flex-column mt-2 w-full">
            <div className="d-flex justify-content-between align-items-center w-full">
              <div className="d-flex align-items-center gap-1">
                <div>{data.label}</div>
                <div className={`width-15 height-15 ${data.color}`}></div>
              </div>

              <div className="d-flex gap-3 w-full w-25 justify-content-end">
                <div>{data.value}</div>
                <div className="text-muted w-25">{data.valueInPercentage}%</div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="d-flex flex-column mt-5">
        {/* Unique */}
        <div className="d-flex justify-content-between align-items-center w-full">
          <div className="d-flex align-items-center gap-1">
            <div>Unique</div>
            <div className="width-15 height-15 bg-success"></div>
          </div>

          {fetchedCSVData && (
            <div className="d-flex gap-3 w-25 justify-content-end">
              <div>{unique}</div>
              <div className="text-muted invisible w-25">dummy</div>
            </div>
          )}
        </div>

        {/* Most Common */}
        <div className="d-flex justify-content-between align-items-center w-full">
          <div className="d-flex align-items-center gap-1">
            <div>Most Common</div>
            <div className="width-15 height-15 bg-warning"></div>
          </div>

          {fetchedCSVData && first2CarData.length > 0 && (
            <div className="d-flex gap-3  w-25 justify-content-end">
              <div>{first2CarData[0]?.label}</div>
              <div className="text-muted w-25">
                {(
                  (first2CarData[0]?.value / fetchedCSVData.length) *
                  100
                ).toFixed(2)}
                %
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressData;
