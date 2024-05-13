import { useCallback, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetInfinityAnnouncementsList } from '@features/announcements';
import { IAnnouncement, ListParams } from '@entities/types';

export const useTechnicalWorks = () => {
  const { t, i18n } = useTranslation('announcements');
  const { getData, isLoading, hasMore } = useGetInfinityAnnouncementsList();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Array<IAnnouncement>>([]);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [showSelect, setShowSelect] = useState(false);
  const selectWrapper = useRef<HTMLDivElement | null>(null);

  interface Params extends ListParams {
    from?: number;
    to?: number;
  }

  const handleLoadAnnouncements = useCallback(async () => {
    const announcementParams: Params = {
      page: page,
      perPage: 6,
      from: to && from ? Math.ceil(from.getTime() / 1000) : undefined,
      to: to ? Math.ceil(to.getTime() / 1000) : undefined,
    };
    const announcements = await getData(announcementParams);
    if (announcements) {
      setData((val) => [...val, ...announcements]);
      setPage((val) => val + 1);
    }
  }, [getData, page, from, to]);

  const handleChange = (val: [Date | null, Date | null]) => {
    setFrom(val[0]);
    setTo(val[1]);
    if (val[1]) {
      setShowSelect(false);
    }
  };

  const handleSelectClick = () => {
    setShowSelect(!showSelect);
  };

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [from, to]);

  useEffect(() => {
    const announcementParams: Params = {
      page: 1,
      perPage: 5,
      from: to && from ? Math.ceil(from.getTime() / 1000) : undefined,
      to: to ? Math.ceil(to.getTime() / 1000) : undefined,
    };
    getData(announcementParams).then((announcements) => {
      if (announcements) {
        setData((val) => [...val, ...announcements]);
        setPage((val) => val + 1);
      }
    });
  }, [getData, from, to]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        selectWrapper.current &&
        !selectWrapper.current.contains(event.target as Node)
      ) {
        setShowSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    announcements: data,
    t,
    i18n,
    hasMore,
    handleLoadAnnouncements,
    isLoading,
    from,
    to,
    handleChange,
    showSelect,
    handleSelectClick,
    selectWrapper,
  };
};
