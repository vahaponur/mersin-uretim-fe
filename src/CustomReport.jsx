import { useState } from "react";
import "./styles.css";

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
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be later than end date.");
      return;
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

      setBunkerData(getBunkerDatasbyBunker(bdata));
      setExtractionScaleData(getExtractionScaleDatasbyExtractionScale(edata))
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false); // Set loading back to false after fetching data
  };

  return (
    <>
      <div>
        <label htmlFor="start-date">Başlangıç Tarihi:</label>
        <input
          type="datetime-local"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="end-date">Bitiş Tarihi:</label>
        <input
          type="datetime-local"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleFetchData} disabled={loading}>Raporla</button>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : bunkerData && extractionScaleData ? (
          <div>
            {/* Display your data here */}
            {/* For example: */}
            <pre>{JSON.stringify(bunkerData, null, 2)}</pre>
            <pre>{JSON.stringify(extractionScaleData, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CustomReport;


const getBunkers = (bunkerDatas)=>{
    const bunkers = new Set()
    for (let index = 0; index < bunkerDatas.length; index++) {
        const element = JSON.stringify(bunkerDatas[index].bunker);
        if(bunkers.has(element))
            continue;
        bunkers.add(element)
    }
    return bunkers
}
const getBunkerDatasbyBunker=(bunkerDatas)=>{
    const bunkers=getBunkers(bunkerDatas)
    const bunkerDataByBunker = {};

  // Initialize bunkerDataByBunker with empty arrays for each bunker
  for (const bunker of bunkers) {
    bunkerDataByBunker[bunker] = [];
  }

  for (const bunkerData of bunkerDatas) {
    const bunkerKey = JSON.stringify(bunkerData.bunker);
    for(const allBunkerData of bunkerDataByBunker[bunkerKey]){
        if (bunkerData["measurementTime"] === allBunkerData["measurementTime"])
        continue
    }
    const newFormData={
        bunkerName:bunkerData['bunker']['name'],
        amount:bunkerData['amount'],
        measurementTime:bunkerData["measurementTime"]
    }
    bunkerDataByBunker[bunkerKey].push(newFormData);
  }

  return bunkerDataByBunker;
}
const getExtractionScales=(extractionScaleDatas)=>{
    const extractionScales = new Set()
    for (let index = 0; index < extractionScaleDatas.length; index++) {
        const element = JSON.stringify(extractionScaleDatas[index].extractionScale);
        if(extractionScales.has(element))
            continue;
        extractionScales.add(element)
    }
    return extractionScales
}
const getExtractionScaleDatasbyExtractionScale=(extractionScaleDatas)=>{
    const extractionScales=getExtractionScales(extractionScaleDatas)
    const esDataByEs = {};

  // Initialize bunkerDataByBunker with empty arrays for each bunker
  for (const es of extractionScales) {
    esDataByEs[es] = [];
  }

  for (const extractionScaleData of extractionScaleDatas) {
    const esKey = JSON.stringify(extractionScaleData['extractionScale']);
    for(const allEsData of esDataByEs[esKey]){
        if (extractionScaleData["measurementTime"] === allEsData["measurementTime"])
        continue
    }
    const newFormData={
        extractionScaleName:extractionScaleData['extractionScale']['name'],
        amount:extractionScaleData['amount'],
        measurementTime:extractionScaleData["measurementTime"],
        deviation:extractionScaleData["deviationFromTarget"]
    }
    esDataByEs[esKey].push(newFormData);
  }

  return esDataByEs;
}

