import { useState,useEffect } from "react";
import "./styles.css"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
const  DailyReport=()=>{
  const [bunkerData,setBunkerData] = useState(null)
  const handleDailyFetchData = async () => {
    const getTodayStartDate = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    };
    let startDate =formatDate(getTodayStartDate())
    let endDate=formatDate(new Date())
    // Perform the API fetch with the selected dates
    try {
      const response = await fetch(
        `http://134.122.69.189:5000/api/bunkerdata/getallbetweendates?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setBunkerData(data)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    handleDailyFetchData()
  }, []); 
return <>
<div>{bunkerData ? (
        <div>
          {/* Display your data here */}
          {/* For example: */}
          <pre>{JSON.stringify(bunkerData, null, 2)}</pre>
        </div>
      ) : (
        <div>Loading...</div>
      )}</div>
</>
};
export default DailyReport