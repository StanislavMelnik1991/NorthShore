import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBuildingsList } from '@features/address';
import { ISelectOption } from '@entities/components';

interface Props {
  onChange: (street: ISelectOption) => void;
  streetId?: number | string;
}

export const useBuilding = ({ onChange, streetId }: Props) => {
  const { t } = useTranslation();
  const { data, getData, isLoading } = useBuildingsList();

  useEffect(() => {
    if (streetId) {
      getData(streetId);
    }
  }, [getData, streetId]);

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
