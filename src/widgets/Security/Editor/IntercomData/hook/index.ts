import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntercomTypeList } from '@features/security';
import { useGetSipFreeAccountList } from '@features/sip';
import { ISelectOption } from '@entities/components';
import { SecuritySipAccount } from '@entities/types';

type Field = 'type' | 'sip_account' | 'entrance_id';

interface Props {
  setFieldValue: (
    field: Field,
    value: ISelectOption | null | undefined | number,
  ) => void;
}

export const useIntercomDataEditor = ({ setFieldValue }: Props) => {
  const { t } = useTranslation('security');
  const {
    data: type,
    getData: getTypes,
    isLoading: isTypeLoading,
  } = useIntercomTypeList();
  const {
    data: sipAccounts,
    getData: getSipAccounts,
    isLoading: isSipAccountsLoading,
  } = useGetSipFreeAccountList();

  const [selectedSip, setSelectedSip] = useState<SecuritySipAccount>();

  useEffect(() => {
    getTypes();
    getSipAccounts();
  }, [getTypes, getSipAccounts]);

  const handleChangeTypeSelection = useCallback(
    (val: unknown) => {
      setFieldValue('type', val as ISelectOption | null);
    },
    [setFieldValue],
  );

  const handleChangeSipSelection = useCallback(
    (val: unknown) => {
      setFieldValue('sip_account', val as ISelectOption | null);
      if (val) {
        const account = sipAccounts.find(
          (el) => el.id === (val as ISelectOption).value,
        );
        setSelectedSip(account);
      } else {
        setSelectedSip(undefined);
      }
    },
    [setFieldValue, sipAccounts],
  );

  const handleChangeAddressSelection = useCallback(
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
        setFieldValue('entrance_id', undefined);
      } else if (building_id) {
        setFieldValue('entrance_id', undefined);
      } else if (entrance_id) {
        setFieldValue('entrance_id', entrance_id);
      }
    },
    [setFieldValue],
  );

  return {
    t,
    isTypeLoading,
    handleChangeTypeSelection,
    handleChangeSipSelection,
    handleChangeAddressSelection,
    isSipAccountsLoading,
    sipAccounts: sipAccounts.map(({ id, phone }) => {
      return { value: id, label: phone };
    }),
    type: type.map(({ id, name, ...data }) => {
      return { value: id, label: name, data };
    }),
    selectedSip,
  };
};
