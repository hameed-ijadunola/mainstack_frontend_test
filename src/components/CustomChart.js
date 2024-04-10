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
import { CustomText } from './CustomText';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: { point: { pointStyle: false } },
  scales: {
    x: {
      display: false, // Hides the grid lines
    },
    y: {
      display: false,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,

  datasets: [
    {
      data: [32, -400, 200, 600, 900, 60, -800],
      borderColor: '#FF5403',
      backgroundColor: '#FF5403',
      borderWidth: 1,
      tension: 0.3,
    },
  ],
};

const CustomChart = () => {
  console.log('data', data?.datasets[0]?.data);
  return (
    <div className="w-100" style={{ height: 240 }}>
      <Line options={options} data={data} />

      <div className="w-100 spaced-rowcentered">
        <div
          style={{
            width: 4,
            height: 4,
            backgroundColor: '#DBDEE5',
            borderRadius: 2,
            marginTop: 9,
          }}
        ></div>
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#DBDEE5',
            marginTop: 19,
            marginBottom: 10,
          }}
        ></div>
        <div
          style={{
            width: 4,
            height: 4,
            backgroundColor: '#DBDEE5',
            borderRadius: 2,
            marginTop: 9,
          }}
        ></div>
      </div>
      <div className="w-100 spaced-rowcentered">
        <CustomText
          text={labels[0]}
          fontSize={14}
          fontWeight={500}
          styleColor={'#56616B'}
        />
        <CustomText
          text={[...labels].pop()}
          fontSize={14}
          fontWeight={500}
          styleColor={'#56616B'}
        />
      </div>
    </div>
  );
};

export default CustomChart;
