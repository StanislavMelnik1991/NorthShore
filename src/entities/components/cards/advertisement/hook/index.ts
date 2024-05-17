import { useEffect, useRef, useState } from 'react';
import { ADVERTISEMENT_ASPECT_RATIO } from '../config';

export const useCard = () => {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const [height, setHeight] = useState<number | string>('auto');

  useEffect(() => {
    if (wrapperRef.current) {
      const clientHeight =
        wrapperRef.current.clientWidth / ADVERTISEMENT_ASPECT_RATIO;
      setHeight(clientHeight);
    }
  }, []);

  return { wrapperRef, height };
};
