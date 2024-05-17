import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  values: Array<string>;
  onChange: (val: Array<string>) => void;
}

export const useEditor = ({ onChange, values }: Props) => {
  const { t } = useTranslation();
  const handleChangeValue = useCallback(
    (index: number) => (val: string) => {
      const newValues = [...values];
      newValues[index] = val;
      if (val === '' && newValues.length > 1) {
        newValues.splice(index, 1);
      }
      onChange(newValues);
    },
    [onChange, values],
  );

  const handleAddValue = useCallback(() => {
    const newValues = [...values];
    newValues.push('');
    onChange(newValues);
  }, [onChange, values]);

  const iterableValues = useMemo(() => {
    return values.length ? values : [''];
  }, [values]);
  return { handleChangeValue, handleAddValue, t, iterableValues };
};
