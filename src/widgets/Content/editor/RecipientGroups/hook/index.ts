import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v1 } from 'uuid';
import { ISelectOption } from '@entities/components';

type Address = {
  id: string;
  entrance?: number | undefined;
  building?: number | undefined;
  street?: number | undefined;
  apartment?: number | undefined;
};

type Group = {
  street_id?: number | undefined;
  building_id?: number | undefined;
  entrance_id?: number | undefined;
  apartment_id?: number | undefined;
};

type Props = {
  setFieldValue: (name: 'recipient_groups', val: Group[]) => void;
  initialAccess?: Array<{
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
    apartment?: ISelectOption;
  }>;
};

export const useSecurityAccessEditor = ({
  setFieldValue,
  initialAccess = [],
}: Props) => {
  const { t } = useTranslation('content');
  const [address, setAddress] = useState<Array<Address>>([{ id: v1() }]);

  useEffect(() => {
    if (initialAccess.length) {
      const initialAddress = initialAccess.map((el) => {
        return {
          id: v1(),
          entrance_id: el.entrance?.value,
        };
      });
      setAddress(initialAddress);
    }
  }, [initialAccess]);

  const handleUpdateValues = useCallback(
    (index: number) => (data?: Omit<Address, 'id'>) => {
      const newValues = [...address];

      if (data) {
        newValues[index] = { ...data, id: newValues[index].id };
        setAddress(newValues);
      } else {
        newValues.splice(index, 1);
        setAddress(newValues);
      }
      const entrances: Group[] = newValues.map(
        ({ apartment, building, entrance, street }) => {
          return {
            apartment_id: apartment,
            building_id: building,
            entrance_id: entrance,
            street_id: street,
          };
        },
      );
      setFieldValue('recipient_groups', entrances);
    },
    [setFieldValue, address],
  );

  const handleClear = useCallback(
    (index: number) => () => {
      const newValues = [...address];
      newValues.splice(index, 1);
      const entrances: Group[] = newValues.map(
        ({ apartment, building, entrance, street }) => {
          return {
            apartment_id: apartment,
            building_id: building,
            entrance_id: entrance,
            street_id: street,
          };
        },
      );
      setAddress(newValues);
      setFieldValue('recipient_groups', entrances);
    },
    [address, setFieldValue],
  );

  const handleAdd = () =>
    setAddress((value) => {
      return [...value, { id: v1() }];
    });

  return {
    t,
    address,
    onChange: handleUpdateValues,
    onClear: handleClear,
    onAdd: handleAdd,
    isDisabled:
      !address[address.length - 1]?.street &&
      !address[address.length - 1]?.building &&
      !address[address.length - 1]?.entrance &&
      !address[address.length - 1]?.apartment,
  };
};
