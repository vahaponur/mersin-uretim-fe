import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
export const BunkerLineGraph = ({ uniqueBunkerData }) => {
  const dataPoints = [];
  const labels = [];
    const startAmount = uniqueBunkerData[0]['amount']
    const endAmount = uniqueBunkerData[uniqueBunkerData.length-1]["amount"]

  for (const bData of uniqueBunkerData) {
    dataPoints.push(bData["amount"]);
    const formattedTimeStamp = formatTimestamp(bData['measurementTime'])
    labels.push(formattedTimeStamp);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: uniqueBunkerData[0]["bunkerName"],
        data: dataPoints,
        borderColor: 'rgba(195, 205, 65, 0.8)',
        backgroundColor: 'rgba(99, 200, 35, 0.8)',
        borderWidth: 1,
        fill: true,
        // Set the 'sampling' option to reduce the number of data points shown on the chart.
        // You can experiment with different modes like 'nearest', 'linear', 'monotone', etc.
        // To set it dynamically, you can pass the 'sampling' prop from the parent component.
        sampling: 'linear', // Default mode: 'nearest'
      },
    ],
  };

  const chartOptions = {
    responsive:true,
    scales: {
      x: {
        display: true,
        // If you want to display labels on the x-axis, you can provide them here.
        // However, the number of labels will still be limited depending on the available space.
        // labels: ['Label1', 'Label2', ...],
      },
    },
    plugins: {
      legend: {
        display: true, // Set this to false if you want to hide the legend entirely.
        position: 'top', // You can change the position of the legend: 'top', 'bottom', 'left', 'right'.
      },
    },
  };

  return<>
    
    <div className='container-sm'>
    <Line data={chartData} options={chartOptions} updateMode='resize' />
    <div className='justify-content-center text-center bg-success text-warning'>
        <p  className=''>{uniqueBunkerData[0]["bunkerName"].toUpperCase()}</p>
    <p className=' m-0'>Baslangic Miktari: {numberWithCommas(Math.floor(startAmount))} kg</p>
    <p className=''>Bitiş Miktari: {numberWithCommas(Math.floor(endAmount))} kg</p>
    <p className=' pb-2'>FARK: {numberWithCommas(Math.floor(endAmount-startAmount))} kg</p>
    </div>
  
    </div>
  
  </> 
};

export const ExtractionScaleLineGraph = ({ uniqueESData }) => {
  const dataPoints = [];
  const labels = [];
let totalAmount = 0


  for (const bData of uniqueESData) {
    dataPoints.push(bData["amount"]);
    const formattedTimeStamp = formatTimestamp(bData['measurementTime'])
    labels.push(formattedTimeStamp);
  }
  dataPoints.forEach(element => {
    totalAmount+=element
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: uniqueESData[0]["extractionScaleName"],
        data: dataPoints,
        borderColor: 'rgba(195, 205, 65, 0.8)',
        backgroundColor: 'rgba(99, 200, 35, 0.8)',
        borderWidth: 1,
        fill: true,
        // Set the 'sampling' option to reduce the number of data points shown on the chart.
        // You can experiment with different modes like 'nearest', 'linear', 'monotone', etc.
        // To set it dynamically, you can pass the 'sampling' prop from the parent component.
        sampling: 'linear', // Default mode: 'nearest'
      },
    ],
  };

  const chartOptions = {
    responsive:true,
    scales: {
      x: {
        display: true,
        // If you want to display labels on the x-axis, you can provide them here.
        // However, the number of labels will still be limited depending on the available space.
        // labels: ['Label1', 'Label2', ...],
      },
    },
    plugins: {
      legend: {
        display: true, // Set this to false if you want to hide the legend entirely.
        position: 'top', // You can change the position of the legend: 'top', 'bottom', 'left', 'right'.
      },
    },
  };

  return<>
    
    <div className='container-sm'>
    <Line data={chartData} options={chartOptions} updateMode='resize' />
    <div className='justify-content-center text-center bg-success text-warning'>
        <p  className=''>{uniqueESData[0]["extractionScaleName"].toUpperCase()}</p>
 
    <p className=' pb-2'>TOPLAM GEÇEN ÜRÜN: {numberWithCommas(Math.floor(totalAmount))} kg</p>
    </div>
  
    </div>
  
  </> 
};


function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
  
    return `${day}-${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}