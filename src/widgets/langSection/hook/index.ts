import { useCallback } from 'react';

interface Options {
  value: string | number;
  label: string;
}

interface Props {
  onChange: (lang: Options) => void;
}

export const useLang = ({ onChange }: Props) => {
  const handleChange = useCallback(
    (val: unknown) => {
      onChange(val as Options);
    },
    [onChange],
  );

  return {
    handleChange,
  };
};
