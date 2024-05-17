import { useCallback } from 'react';

interface Props {
  onChange: (lang: { value: 'en' | 'ru'; label: string }) => void;
}

export const useLang = ({ onChange }: Props) => {
  const handleChange = useCallback(
    (val: unknown) => {
      onChange(val as { value: 'en' | 'ru'; label: string });
    },
    [onChange],
  );

  return {
    handleChange,
  };
};
