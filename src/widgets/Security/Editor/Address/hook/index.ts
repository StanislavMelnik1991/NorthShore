import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Fields =
  | 'address_building_id'
  | 'address_entrance_id'
  | 'address_street_id';

interface Props {
  setFieldValue: (field: Fields, val: string | number | undefined) => void;
}

export const useSecurityAddressEditor = ({ setFieldValue }: Props) => {
  const { t } = useTranslation('security');
  const handleChangeSelection = useCallback(
    ({
      building_id,
      entrance_id,
      street_id,
    }: {
      building_id?: number;
      entrance_id?: number;
      street_id?: number;
    }) => {
      if (street_id) {
        setFieldValue('address_building_id', undefined);
        setFieldValue('address_entrance_id', undefined);
        setFieldValue('address_street_id', street_id);
      } else if (building_id) {
        setFieldValue('address_building_id', building_id);
        setFieldValue('address_entrance_id', undefined);
      } else if (entrance_id) {
        setFieldValue('address_entrance_id', entrance_id);
      }
    },
    [setFieldValue],
  );
  return { t, handleChangeSelection };
};
