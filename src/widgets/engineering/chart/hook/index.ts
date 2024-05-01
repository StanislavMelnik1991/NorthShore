import { differenceInDays, format } from 'date-fns';
import { ru, enGB } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { IEngineeringResults } from '@entities/types';
import { LanguageEnum, MAX_DAYS_PERIOD } from '@shared/constants';

interface Props {
  data?: IEngineeringResults;
  from: Date;
  to: Date;
}

const locales = {
  ru,
  en: enGB,
};

export const useEngineeringChar = ({ data, from, to }: Props) => {
  const { t, i18n } = useTranslation('engineering');
  const measures = data?.type.measures || '';
  const results = data?.results || [];
  const barData = {
    labels: results.map((el, index) => {
      const expectedTime = new Date(from.getTime());
      const daysBetween = differenceInDays(to, from);
      if (daysBetween > MAX_DAYS_PERIOD) {
        expectedTime.setMonth(expectedTime.getMonth() + index);
      } else {
        expectedTime.setDate(expectedTime.getDate() + index);
      }
      const time = el?.timestamp * 1000;
      return format(time || expectedTime, 'dd MMMM', {
        locale: locales[i18n.language as LanguageEnum],
      });
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
  const total = results.reduce((prev, current) => {
    return prev + (current?.current_value || 0);
  }, 0);
  return { barData, t, total, measures };
};
