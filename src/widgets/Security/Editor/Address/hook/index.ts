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
      building,
      entrance,
      street,
    }: {
      building?: number;
      entrance?: number;
      street?: number;
    }) => {
      if (street) {
        setFieldValue('address_building_id', undefined);
        setFieldValue('address_entrance_id', undefined);
        setFieldValue('address_street_id', street);
      } else if (building) {
        setFieldValue('address_building_id', building);
        setFieldValue('address_entrance_id', undefined);
      } else if (entrance) {
        setFieldValue('address_entrance_id', entrance);
      }
    },
    [setFieldValue],
  );
  return { t, handleChangeSelection };
};
