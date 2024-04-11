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
      display: false,
    },
    y: {
      display: false,
    },
  },
};

const CustomChart = ({ data, labels }) => {
  return (
    <div className="w-100" style={{ height: 240 }} data-testid="custom-chart">
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
