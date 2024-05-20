import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetInfinityMeetingsList } from '@features/meetings';
import { ISelectOption } from '@entities/components';
import { INews, ListParams } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

interface Params extends ListParams {
  from?: Date;
  to?: Date;
  status_id?: number;
}

export const useList = () => {
  const { t, i18n } = useTranslation('meetings');
  const { getData, isLoading, total } = useGetInfinityMeetingsList();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Array<INews>>([]);
  const filterConfig = useMemo(() => {
    return [
      {
        label: t('filters.all'),
        value: 0,
      },
      {
        label: t('filters.actual'),
        value: 1,
      },
      {
        label: t('filters.closed'),
        value: 2,
      },
      {
        label: t('filters.failed'),
        value: 3,
      },
    ];
  }, [t]);

  const [status, setStatus] = useState<ISelectOption>(filterConfig[0]);
  const handleLoadData = useCallback(async () => {
    const newsParams: Params = {
      page: page,
      perPage: 18,
      status_id: status?.value || undefined,
    };
    const newData = await getData(newsParams);
    if (newData) {
      setData((val) => [...val, ...newData]);
      setPage((val) => val + 1);
    }
  }, [getData, page, status]);

  useEffect(() => {
    const newsParams: Params = {
      page: 1,
      perPage: 18,
      status_id: status?.value || undefined,
    };
    getData(newsParams).then((news) => {
      if (news) {
        setData(news);
        setPage((val) => val + 1);
      }
    });
  }, [getData, status]);

  const handleFilterChange = useCallback(
    (val: unknown) => {
      if (val) {
        setStatus(val as { value: number; label: string });
      } else {
        setStatus(filterConfig[0]);
      }
    },
    [filterConfig],
  );

  return {
    data,
    isLoading,
    t,
    lang: i18n.language as LanguageEnum,
    hasMore: page < total,
    handleLoadData,
    filterConfig,
    handleFilterChange,
    status,
  };
};
