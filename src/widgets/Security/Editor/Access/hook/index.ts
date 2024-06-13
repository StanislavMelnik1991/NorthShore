import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v1 } from 'uuid';
import { ISelectOption } from '@entities/components';

type Address = {
  id: string;
  entrance?: number | undefined;
  building?: number | undefined;
  street?: number | undefined;
};

type Props = {
  setFieldValue: (name: 'entrances_ids', val: number[]) => void;
  initialAccess?: Array<{
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  }>;
};

export const useSecurityAccessEditor = ({
  setFieldValue,
  initialAccess = [],
}: Props) => {
  const { t } = useTranslation('security');
  const [address, setAddress] = useState<Array<Address>>([{ id: v1() }]);

  useEffect(() => {
    if (initialAccess.length) {
      const initialAddress = initialAccess.map((el) => {
        return {
          id: v1(),
          entrance: el.entrance?.value,
        };
      });
      setAddress(initialAddress);
    }
  }, [initialAccess]);

  const handleUpdateValues = useCallback(
    (index: number) => (data?: Omit<Address, 'id'>) => {
      const newValues = [...address];
      const entrances: number[] = [];
      if (data) {
        newValues[index] = { ...data, id: newValues[index].id };
        newValues.forEach(({ entrance }) => {
          if (entrance) {
            entrances.push(entrance);
          }
        });
        setAddress(newValues);
      } /* else {
        newValues.splice(index, 1);
        newValues.forEach(({ entrance }) => {
          if (entrance) {
            entrances.push(entrance);
          }
        });
        setAddress(newValues);
      } */
      setFieldValue('entrances_ids', entrances);
    },
    [setFieldValue, address],
  );

  const handleClear = useCallback(
    (index: number) => () => {
      const newValues = [...address];
      newValues.splice(index, 1);
      const entrances: number[] = [];
      newValues.forEach(({ entrance }) => {
        if (entrance) {
          entrances.push(entrance);
        }
      });
      setAddress(newValues);
      setFieldValue('entrances_ids', entrances);
    },
    [address, setFieldValue],
  );

  const handleAdd = useCallback(() => {
    const newValues = [...address, { id: v1() }];
    setAddress(newValues);
  }, [address]);

  return {
    t,
    address,
    onChange: handleUpdateValues,
    onClear: handleClear,
    onAdd: handleAdd,
  };
};
