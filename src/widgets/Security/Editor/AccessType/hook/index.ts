import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccessTypeList } from '@features/security';
import { ISelectOption } from '@entities/components';

interface Props {
  setFieldValue: (field: 'type', value: ISelectOption | null) => void;
}

export const useAccessTypeEditor = ({ setFieldValue }: Props) => {
  const { t } = useTranslation('security');
  const { data, getData, isLoading } = useAccessTypeList();

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChangeSelection = useCallback(
    (val: unknown) => {
      setFieldValue('type', val as ISelectOption | null);
    },
    [setFieldValue],
  );

  return {
    t,
    isLoading,
    handleChangeSelection,
    data: data.map(({ id, name }) => {
      return { value: id, label: name };
    }),
  };
};
