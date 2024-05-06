import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Fields = 'apartment_id';

interface Props {
  setFieldValue: (field: Fields, val: string | number | undefined) => void;
}

export const useSlsIntercomEditor = ({ setFieldValue }: Props) => {
  const { t } = useTranslation('security');
  const handleChangeSelection = useCallback(
    ({ apartment }: { apartment?: number }) => {
      if (apartment) {
        setFieldValue('apartment_id', apartment);
      } else {
        setFieldValue('apartment_id', undefined);
      }
    },
    [setFieldValue],
  );
  return { t, handleChangeSelection };
};
