import React, { useEffect } from "react";

interface LeftSideComponentProps {
  fetchedCSVData: any;
  first2CarData: any;
  dataList: any;
  other: any;
  heading: string;
  description: string;
  type: number;
}

const LeftSideComponent: React.FC<LeftSideComponentProps> = ({
  fetchedCSVData,
  first2CarData,
  dataList,
  other,
  heading,
  description,
  type,
}) => {
  return (
    <div className="d-flex flex-1 flex-column">
      <div>
        <div className="fw-bold">{heading}</div>
        <div>{description}</div>
      </div>

      {type === 0 ? (
        <div className="d-flex flex-column gap-3">
          <div>
            {fetchedCSVData &&
              first2CarData &&
              first2CarData.map((data: any) => {
                return (
                  <div className="d-flex w-full justify-content-between">
                    <div>{data?.label}</div>
                    <div className="fw-bold text-primary">
                      {((data?.value * 100) / fetchedCSVData.length).toFixed(2)}
                      %
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="d-flex justify-content-between text-muted fs-6">
            <div>Other({Object.keys(dataList).length - 2})</div>
            <div>
              {fetchedCSVData &&
                other &&
                ((other * 100) / fetchedCSVData.length).toFixed(2)}
              %
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-1 flex-column">
          <div className="mt-5">
            <div className="fs-1 fw-bold text-primary">
              {Object.keys(dataList).length}
            </div>
            <div className="fw-bold">unique values</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSideComponent;
