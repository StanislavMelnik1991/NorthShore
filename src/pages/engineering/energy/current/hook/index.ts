import { differenceInDays } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetCurrentEnergyConsumer } from '@features/engineering';
import { formatAddress, getEndOfMonth, getStartOfMonth } from '@features/utils';
import { MAX_DAYS_PERIOD } from '@shared/constants';

export const useCurrentEnergy = () => {
  const { t } = useTranslation('engineering');
  const { data, getData, isLoading, total } = useGetCurrentEnergyConsumer();

  const { id } = useParams<{ id: string }>();
  const [from, setFrom] = useState<Date>(getStartOfMonth());
  const [to, setTo] = useState<Date>(getEndOfMonth());

  const isShowMonth = differenceInDays(to, from) > MAX_DAYS_PERIOD;
  const location = formatAddress({ apartment: data?.apartment });

  useEffect(() => {
    getData({
      id: id as string,
      from: Math.floor(from.getTime() / 1000),
      to: Math.floor(to.getTime() / 1000),
      variant: isShowMonth ? 'monthly' : 'daily',
    });
  }, [from, getData, id, isShowMonth, to]);

  const month = isShowMonth
    ? (data?.results || []).map((el, index) => {
        const expectedTime = new Date(from.getTime());
        const daysBetween = differenceInDays(to, from);
        if (daysBetween > MAX_DAYS_PERIOD) {
          expectedTime.setMonth(expectedTime.getMonth() + index);
        } else {
          expectedTime.setDate(expectedTime.getDate() + index);
        }
        const time = el ? new Date(el.timestamp * 1000) : undefined;
        return { date: time || expectedTime, total: el?.current_value || 0 };
      })
    : undefined;
  const handleSetTo = useCallback((val: Date | null) => {
    if (val) {
      setTo(val);
    }
  }, []);
  const handleSetFrom = useCallback((val: Date | null) => {
    if (val) {
      setFrom(val);
    }
  }, []);

  return {
    isLoading,
    t,
    from,
    setFrom: handleSetFrom,
    setTo: handleSetTo,
    to,
    title: data ? `${data?.type?.name} №${data.name || id}` : '',
    measures: data?.type.measures || '',
    location,
    results: data?.results || [],
    delta: data?.delta || [],
    charge_status: data?.charge_status?.name,
    operating_mode: data?.operating_mode?.name,
    voltage: data?.voltage,
    id: id as string,
    month,
    total: total ? total.toFixed(2) : '',
    isShowMonth,
  };
};
