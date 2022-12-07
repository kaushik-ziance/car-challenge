import React, { useEffect, useState } from "react";
import LeftSideComponent from "./leftsidecomponent/LeftSideComponent";

// components
import ProgressData from "./rightsidecomponent/ProgressData";

interface VehicleClassProps {
  fetchedCSVData: any;
}

const VehicleClass: React.FC<VehicleClassProps> = ({ fetchedCSVData }) => {
  const [first2CarData, setFirst2CarData] = useState<any>([]);
  const [other, setOther] = useState(0);
  const [vehicleClassList, setVehicleClassList] = useState<any>({});

  const arrangeData = () => {
    // Vehicle Class List
    const vehicleClassListData: any = {};

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
      <LeftSideComponent
        fetchedCSVData={fetchedCSVData}
        first2CarData={first2CarData}
        dataList={vehicleClassList}
        other={other}
        heading={"C. Vehicle Class"}
        description={
          "class of vehicle depending on their utility, capacity and weight"
        }
        type={0}
      />

      <div className="flex-2">
        <ProgressData
          fetchedCSVData={fetchedCSVData}
          first2CarData={first2CarData}
          unique={Object.keys(vehicleClassList).length}
        />
      </div>
    </div>
  );
};

export default VehicleClass;
