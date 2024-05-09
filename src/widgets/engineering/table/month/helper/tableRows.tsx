import { format } from 'date-fns';
import { TableText } from '@entities/components';
import { IEngineeringResults } from '@entities/types';

interface Props {
  measures: string;
  data: IEngineeringResults['results'];
}

export const useTableRows = ({ data, measures }: Props) => {
  return data.map((el, index, arr) => {
    const timestamp = el?.timestamp || Date.now() / 1000;
    const current_value = el?.current_value || 0;
    const prevValue =
      index > 0 ? current_value - arr[index - 1].current_value : 0;
    return {
      date: <TableText>{format(timestamp * 1000, 'dd.MM.yyyy')}</TableText>,
      consumption: <TableText>{`${current_value}, ${measures}`}</TableText>,
      delta: <TableText>{`${prevValue}, ${measures}`}</TableText>,
    };
  });
};
