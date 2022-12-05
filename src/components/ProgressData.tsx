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
    if (fetchedCSVData) {
      setValidDataPercentage((valid.length / fetchedCSVData.length) * 100);
      setMismatchedDataPercentage(
        (mismatched.length / fetchedCSVData.length) * 100
      );
      setMissingDataPercentage((missing.length / fetchedCSVData.length) * 100);
    }
  };

  useEffect(() => {
    handlePercentageData();
  }, [
    fetchedCSVData,
    validDataPercentage,
    mismatchedDataPercentage,
    missingDataPercentage,
  ]);

  return (
    <div>
      <Progress multi>
        <Progress bar color="success" value={validDataPercentage} />
        <Progress bar color="warning" value={mismatchedDataPercentage} />
        <Progress bar color="danger" value={missingDataPercentage} />
      </Progress>

      <div className="d-flex flex-column mt-2">
        {/* Valid */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-1">
            <div>Valid</div>
            <div className="width-15 height-15 bg-success"></div>
          </div>

          <div className="d-flex gap-3">
            <div>{valid.length}</div>
            <div className="text-muted">{validDataPercentage}%</div>
          </div>
        </div>

        {/* Mismatched */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-1">
            <div>Mismatched</div>
            <div className="width-15 height-15 bg-warning"></div>
          </div>

          <div className="d-flex gap-3">
            <div>{mismatched.length}</div>
            <div className="text-muted">{mismatchedDataPercentage}%</div>
          </div>
        </div>

        {/* Missing */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-1">
            <div>Missing</div>
            <div className="width-15 height-15 bg-danger"></div>
          </div>

          <div className="d-flex gap-3">
            <div>{missing.length}</div>
            <div className="text-muted">{missingDataPercentage}%</div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column mt-5">
        {/* Unique */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-1">
            <div>Unique</div>
            <div className="width-15 height-15 bg-success"></div>
          </div>

          {fetchedCSVData && (
            <div className="d-flex gap-3 justify-content-between">
              <div>{unique}</div>
              <div className="text-muted invisible">4dfdf</div>
            </div>
          )}
        </div>

        {/* Most Common */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-1">
            <div>Most Common</div>
            <div className="width-15 height-15 bg-warning"></div>
          </div>

          {fetchedCSVData && first2CarData.length > 0 && (
            <div className="d-flex gap-3">
              <div>{first2CarData[0]?.label}</div>
              <div className="text-muted">
                {Math.round(
                  (first2CarData[0]?.value / fetchedCSVData.length) * 100
                )}
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
