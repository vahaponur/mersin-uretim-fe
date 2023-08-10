import { useState,useEffect } from "react";
import "./styles.css";
import * as dataHelper from "./dataHelper"
import { BunkerLineGraph, ExtractionScaleLineGraph } from "./Chart";
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const DailyReport = () => {

  const [bunkerData, setBunkerData] = useState([]);
  const [extractionScaleData,setExtractionScaleData]=useState([])
  const [loading, setLoading] = useState(true); // Start with loading state as true
  const [dataFetched, setDataFetched] = useState(false);
 


  useEffect(() => {
    // Function to fetch data for the daily report
    const fetchDailyReportData = async () => {
      setLoading(true)
      const std = new Date();
      std.setHours(0);
      std.setMinutes(0);
      std.setSeconds(0);
      std.setMilliseconds(0);
      const end = new Date();

      try {
        const response1 = await fetch(
          `http://134.122.69.189:5000/api/bunkerdata/getallbetweendates?startDate=${
            formatDate(std)
          }&endDate=${formatDate(end)}`
        );
        console.log(response1)
        const response2 = await fetch(
          `http://134.122.69.189:5000/api/extractionscaledata/getallbetweendates?startDate=${
            formatDate(std)
          }&endDate=${formatDate(end)}`
        );

        const bdata = await response1.json();
        const edata = await response2.json();

        setBunkerData(dataHelper.getBunkerDatasbyBunker(bdata));
        setExtractionScaleData(
          dataHelper.getExtractionScaleDatasbyExtractionScale(edata)
        );
        setDataFetched(true); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false); // Set loading back to false after fetching data
    };

    fetchDailyReportData(); // Fetch data when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>



      <div>
        {loading ? (
          <div>Loading...</div>
        ) : dataFetched ? (
          <div className="container">
            {/* Display your data here */}
            {/* For example: */}

            {(()=>{
  const bunkers = Object.keys(bunkerData);
  const extractionScales=Object.keys(extractionScaleData)
  let j=0
  let graphs = [];
  let graphsToRender=[];
  for (const es of extractionScales) {
    j++
    const esData=extractionScaleData[es] 
    graphs.push(<ExtractionScaleLineGraph key={es} uniqueESData={esData}/>)
    if(j%2==0){
      graphsToRender.push(
      <div className="row">
        <div className="col">{graphs[0]}</div>
        <div className="col">{graphs[1]}</div>
      </div>)
      graphs=[]
    }
    else if(j === extractionScales.length){
      graphsToRender.push(
        <div className="row">
          <div className="col-6">{graphs[0]}</div>

        </div>)
    }
  }

  let i = 0
  for (const bunker of bunkers) {
    i++
    const bunkerDataArray = bunkerData[bunker];
    graphs.push(<BunkerLineGraph key={bunker} uniqueBunkerData={bunkerDataArray} />);
    if(i%2==0){
      graphsToRender.push(
      <div className="row">
        <div className="col">{graphs[0]}</div>
        <div className="col">{graphs[1]}</div>
      </div>)
      graphs=[]
    }
    else if(i === bunkers.length){
      graphsToRender.push(
        <div className="row">
          <div className="col-6">{graphs[0]}</div>

        </div>)
    }
  }

  return graphsToRender;
})()}
            

          </div>
        ) : <div className="text-center mt-5">KULLANILABILACAK VERI YOK</div>}
      </div>
    </>
  );
};

export default DailyReport;




