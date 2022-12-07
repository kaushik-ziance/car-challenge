import React, { useEffect, useState } from "react";
import LeftSideComponent from "./leftsidecomponent/LeftSideComponent";
import ProgressData from "./rightsidecomponent/ProgressData";

interface ModelCarProps {
  fetchedCSVData: any;
}

const ModelCar: React.FC<ModelCarProps> = ({ fetchedCSVData }) => {
  const [first2CarData, setFirst2CarData] = useState<any>([]);
  const [modelList, setModelList] = useState<any>({});

  const arrangeData = () => {
    // Car Model List
    const modelListData: any = {};

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
      <LeftSideComponent
        fetchedCSVData={fetchedCSVData}
        first2CarData={first2CarData}
        dataList={modelList}
        heading={"B. Model"}
        description={"Car Model"}
        other={""}
        type={1}
      />

      <div className="flex-2">
        <ProgressData
          fetchedCSVData={fetchedCSVData}
          first2CarData={first2CarData}
          unique={Object.keys(modelList).length}
        />
      </div>
    </div>
  );
};

export default ModelCar;
