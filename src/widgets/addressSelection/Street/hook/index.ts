import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStreetsList } from '@features/address';
import { ISelectOption } from '@entities/components';

interface Props {
  onChange: (street: ISelectOption) => void;
}

export const useStreet = ({ onChange }: Props) => {
  const { t } = useTranslation();
  const { data, getData, isLoading } = useStreetsList();

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = useCallback(
    (val: unknown) => {
      onChange(val as ISelectOption);
    },
    [onChange],
  );

  return {
    t,
    data: data.map((el) => {
      return {
        value: el.id,
        label: el.name,
      };
    }),
    isLoading,
    handleChange,
  };
};
