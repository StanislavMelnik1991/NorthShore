import { useCallback, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetInfinityTechnicalWorksList } from '@features/technicalWorks';
import { ITechWork, ListParams } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

export const useTechnicalWorks = () => {
  const { t, i18n } = useTranslation('technicalWorks');
  const { getData, isLoading, hasMore } = useGetInfinityTechnicalWorksList();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Array<ITechWork>>([]);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [showSelect, setShowSelect] = useState(false);
  const selectWrapper = useRef<HTMLDivElement | null>(null);

  interface Params extends ListParams {
    from?: number;
    to?: number;
  }

  const handleLoadTechnicalWorks = useCallback(async () => {
    const techWorksParams: Params = {
      page: page,
      perPage: 5,
      from: to && from ? Math.ceil(from.getTime() / 1000) : undefined,
      to: to ? Math.ceil(to.getTime() / 1000) : undefined,
    };
    const techWorks = await getData(techWorksParams);
    if (techWorks) {
      setData((val) => [...val, ...techWorks]);
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
    const techWorksParams: Params = {
      page: 1,
      perPage: 5,
      from: to && from ? Math.ceil(from.getTime() / 1000) : undefined,
      to: to ? Math.ceil(to.getTime() / 1000) : undefined,
    };
    getData(techWorksParams).then((techWorks) => {
      if (techWorks) {
        setData((val) => [...val, ...techWorks]);
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
    techWorks: data,
    t,
    i18n,
    lang: i18n.language as LanguageEnum,
    hasMore,
    handleLoadTechnicalWorks,
    isLoading,
    from,
    to,
    handleChange,
    showSelect,
    handleSelectClick,
    selectWrapper,
  };
};
