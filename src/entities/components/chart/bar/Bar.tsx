import { ChartData, ChartOptions } from 'chart.js';
import classNames from 'classnames';
import { Bar } from 'react-chartjs-2';
import styles from './Bar.module.scss';

interface Props {
  className?: string;
  options?: ChartOptions<'bar'>;
  data: ChartData<'bar', (number | [number, number] | null)[], unknown>;
}

export const StyledBar = ({ className, options, data }: Props) => {
  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };
  return (
    <Bar
      className={classNames(styles.wrapper, className)}
      options={{ ...defaultOptions, ...options }}
      data={data}
    />
  );
};
