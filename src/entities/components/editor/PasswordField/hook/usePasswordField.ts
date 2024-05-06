import { useCallback, useState } from 'react';

export const usePasswordField = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleToggleIsShowPassword = useCallback(() => {
    setIsShowPassword((val) => !val);
  }, []);
  return {
    isShowPassword,
    toggleIsShowPassword: handleToggleIsShowPassword,
  };
};
