import { ChangeEvent } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { Heading } from '@/ui/heading';

import styles from './dynamic.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  data: ChartData<'line', number[], string>;
  selectOptions: number[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CHART_OPTIONS: ChartOptions<'line'> = {
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      callbacks: {
        title: () => '',
        label: function (context) {
          const value = context.parsed.y;
          return `${value.toFixed(2)} ₽`;
        },
      },
      backgroundColor: '#210b36',
      bodyColor: '#fff',
      bodyFont: { size: 15, weight: 700 },
      displayColors: false,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      cubicInterpolationMode: 'monotone',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: { size: 14 },
        color: '#c6b6d7',
      },
    },
    y: {
      grid: {
        color: '#210b36',
      },
      ticks: {
        font: { size: 15 },
        color: '#c6b6d7',
        callback: function (value) {
          return `${value} ₽`;
        },
      },
    },
  },
};

export const Dynamic = ({ data, selectOptions, onChange }: Props) => {
  return (
    <div className={styles.dynamic}>
      <Heading level="h3" size="sizeMedium" marginBottom="mbSmall">
        Динамика
      </Heading>
      <div className={styles.dynamicChart}>
        <select
          className={styles.dynamicSelect}
          name="chart"
          id="chart"
          onChange={onChange}
        >
          {selectOptions.map((year, index) => (
            <option key={index} value={`${year}`}>{`${year}`}</option>
          ))}
        </select>
        {data && <Line data={data} options={CHART_OPTIONS} />}
      </div>
    </div>
  );
};
