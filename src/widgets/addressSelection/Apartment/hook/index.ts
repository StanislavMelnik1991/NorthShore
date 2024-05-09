import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApartmentsList } from '@features/address';
import { ISelectOption } from '@entities/components';

interface Props {
  onChange: (street: ISelectOption) => void;
  entranceId?: number | string;
}

export const useApartment = ({ onChange, entranceId }: Props) => {
  const { t } = useTranslation();
  const { data, getData, isLoading } = useApartmentsList();

  useEffect(() => {
    if (entranceId) {
      getData(entranceId);
    }
  }, [getData, entranceId]);

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
