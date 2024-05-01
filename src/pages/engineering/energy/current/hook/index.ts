import { differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetCurrentEnergyConsumers } from '@features/engineering/energy/hooks/getCurrent';
import { getEndOfMonth, getStartOfMonth } from '@features/utils';
import { MAX_DAYS_PERIOD } from '@shared/constants';

export const useCurrentEnergy = () => {
  const { t } = useTranslation('engineering');
  const { data, getData, isLoading } = useGetCurrentEnergyConsumers();
  const { id } = useParams<{ id: string }>();
  const [from, setFrom] = useState<Date | null>(getStartOfMonth());
  const [to, setTo] = useState<Date | null>(getEndOfMonth());

  useEffect(() => {
    const dateFrom = from || new Date();
    const dateTo = to || new Date();
    const daysBetween = differenceInDays(dateTo, dateFrom);
    getData({
      id: id as string,
      from: Math.floor(dateFrom.getTime() / 1000),
      to: Math.floor(dateTo.getTime() / 1000),
      variant: daysBetween > MAX_DAYS_PERIOD ? 'monthly' : 'daily',
    });
  }, [from, getData, id, to]);

  return {
    isLoading,
    t,
    from,
    setFrom,
    setTo,
    to,
    data,
    title: `${data?.type.name} №${id}`,
  };
};
