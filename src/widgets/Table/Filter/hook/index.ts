import { useEffect, useRef, useState } from 'react';

interface Props {
  isActive?: boolean;
}

export const useFiler = ({ isActive }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFilterShow, setIsFilterShow] = useState(false);

  const toggleShowFilter = () => {
    setIsFilterShow((val) => !val);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFilterShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (isActive) {
      setIsFilterShow(false);
    }
  }, [isActive]);

  return { isFilterShow, toggleShowFilter, wrapperRef };
};
