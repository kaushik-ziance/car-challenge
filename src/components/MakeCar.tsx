import React, { useEffect, useState } from "react";
import LeftSideComponent from "./leftsidecomponent/LeftSideComponent";

// components
import ProgressData from "./rightsidecomponent/ProgressData";

interface MakeCarProps {
  fetchedCSVData: any;
}

const MakeCar: React.FC<MakeCarProps> = ({ fetchedCSVData }) => {
  const [first2CarData, setFirst2CarData] = useState<any>([]);
  const [other, setOther] = useState(0);
  const [companyList, setCompanyList] = useState<any>({});

  const arrangeData = () => {
    // Car Company List
    const companyListData: any = {};

    // Finding Total Companies and their length
    fetchedCSVData?.map((data: any) => {
      const previousValue = companyListData[data["Make"]];

      if (previousValue === undefined) {
        // adding key and value
        // If the value is not exist then create new value
        companyListData[data["Make"]] = 1;
      } else {
        // add the value [length]
        // If the value is exist then increase their length
        companyListData[data["Make"]] = previousValue + 1;
      }
    });

    setCompanyList(companyListData);

    // Finding top2 Compnay's list

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
    // Arrange the CSV data when the value in dependies changed
    arrangeData();
  }, [fetchedCSVData]);

  return (
    <div className="d-flex text-start gap-4 border-bottom pb-2">
      <LeftSideComponent
        fetchedCSVData={fetchedCSVData}
        first2CarData={first2CarData}
        dataList={companyList}
        other={other}
        heading={"A. Make"}
        description={"Compnay of the vehicle"}
        type={0}
      />

      <div className="flex-2">
        <ProgressData
          fetchedCSVData={fetchedCSVData}
          first2CarData={first2CarData}
          unique={Object.keys(companyList).length}
        />
      </div>
    </div>
  );
};

export default MakeCar;
