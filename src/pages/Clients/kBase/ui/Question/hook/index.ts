import { useCallback, useState } from 'react';

export const useQuestion = () => {
  const [isShow, setIsShow] = useState(false);

  const handleToggleShow = useCallback(() => {
    setIsShow((val) => !val);
  }, []);

  return {
    handleToggleShow,
    isShow,
  };
};
