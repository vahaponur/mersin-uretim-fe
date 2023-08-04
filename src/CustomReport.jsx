import { useState } from "react";
import "./styles.css";
import * as dataHelper from "./dataHelper"
import { BunkerLineGraph } from "./Chart";
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const CustomReport = () => {
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [bunkerData, setBunkerData] = useState(null);
  const [extractionScaleData,setExtractionScaleData]=useState(null)
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {

    const sd=new Date(startDate)
    const ed=new Date(endDate)
    if (sd >= ed) {
      alert("Baslangic tarihi bitisten erken veya ayni olamaz");
      return;
    }
    const differenceInMs = ed - sd;
    const differenceInDays = differenceInMs / (1000 * 3600 * 24);

            // Check if the difference is greater than 5 days
            if (differenceInDays > 5) {
                alert('En fazla 5 gunluk rapor alinabilir');
                return
            } 


    setLoading(true); // Set loading to true before fetching data

    // Perform the API fetch with the selected dates
    try {
      const response1 = await fetch(
        `http://134.122.69.189:5000/api/bunkerdata/getallbetweendates?startDate=${startDate}&endDate=${endDate}`
      );
      const response2 = await fetch(
        `http://134.122.69.189:5000/api/extractionscaledata/getallbetweendates?startDate=${startDate}&endDate=${endDate}`
      );
      const bdata = await response1.json();
      const edata=await response2.json()

      setBunkerData(dataHelper.getBunkerDatasbyBunker(bdata));
      setExtractionScaleData(dataHelper.getExtractionScaleDatasbyExtractionScale(edata))
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false); // Set loading back to false after fetching data
  };

  return (
    <>
    <div className="container text-center mt-5">
    <div className="row justify-content-md-center mb-2 ">
        <label className="col col-lg-2" htmlFor="start-date">Başlangıç Tarihi: </label>
        <input
        className="col col-lg-2"
          type="datetime-local"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="row justify-content-md-center">
        <label className="col col-lg-2" htmlFor="end-date">Bitiş Tarihi:</label>
        <input
        className="col col-lg-2"
          type="datetime-local"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button className="mt-2 btn btn-warning "  type="button" onClick={handleFetchData} disabled={loading}>Raporla</button>
    </div>


      <div>
        {loading ? (
          <div>Loading...</div>
        ) : bunkerData && extractionScaleData ? (
          <div className="container">
            {/* Display your data here */}
            {/* For example: */}

            {(()=>{
  const bunkers = Object.keys(bunkerData);
  let graphs = [];
  let graphsToRender=[];
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
    if(i === bunkers.length){
      graphsToRender.push(
        <div className="row">
          <div className="col-6">{graphs[0]}</div>

        </div>)
    }
  }

  return graphsToRender;
})()}
            
            <pre>{JSON.stringify(bunkerData, null, 2)}</pre>
            <pre>{JSON.stringify(extractionScaleData, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CustomReport;




