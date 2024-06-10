import { differenceInDays, format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useLocalizedDate } from '@features/date';
import { IEngineeringResults } from '@entities/types';
import { MAX_DAYS_PERIOD } from '@shared/constants';

interface Props {
  results: IEngineeringResults['results'];
  measures: string;
  from: Date;
  to: Date;
}

export const useEngineeringChar = ({ measures, results, from, to }: Props) => {
  const { t } = useTranslation('engineering');
  const { getLocalizedMonth } = useLocalizedDate();
  const barData = {
    labels: results.map((el, index) => {
      const expectedTime = new Date(from.getTime());
      const daysBetween = differenceInDays(to, from);
      if (daysBetween > MAX_DAYS_PERIOD) {
        expectedTime.setMonth(expectedTime.getMonth() + index);
      } else {
        expectedTime.setDate(expectedTime.getDate() + index);
      }
      const time = el ? new Date(el.timestamp * 1000) : undefined;
      return daysBetween > MAX_DAYS_PERIOD
        ? getLocalizedMonth((time || expectedTime).getMonth())
        : format(time || expectedTime, 'dd.MM');
    }),
    datasets: [
      {
        label: measures,
        data: results.map((el) => {
          return el?.current_value;
        }),
        backgroundColor: 'rgba(27, 158, 127, 1)',
      },
    ],
  };

  const minDate = new Date();
  minDate.setFullYear(2024, 5, 1);

  return { barData, t, minDate };
};
