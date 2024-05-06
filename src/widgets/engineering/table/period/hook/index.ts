import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IEngineeringResults } from '@entities/types';
import { useTableHeader, useTableRows } from '../helper';

interface Props {
  measures: string;
  results: IEngineeringResults['results'];
}

export const useTable = ({ results, measures }: Props) => {
  const { t } = useTranslation('table');
  const [isExpanded, setIsExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleIsExpanded = useCallback(() => {
    setIsExpanded((val) => !val);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [wrapperRef]);
  const header = useTableHeader({ measures });
  const rows = useTableRows({
    data: results.filter((el) => !!el) || [],
    measures,
  });
  return {
    t,
    isExpanded,
    header,
    rows,
    toggleIsExpanded,
    wrapperRef,
  };
};
