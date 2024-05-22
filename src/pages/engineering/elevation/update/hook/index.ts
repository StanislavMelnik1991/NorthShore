import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateElevator,
  useGetCurrentElevator,
} from '@features/engineering';
import { ISelectOption } from '@entities/components';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type ValuesType = {
  entrance_id?: number;
  ip_address?: string;
  registry_address?: string;
};

export const useUpdatePage = () => {
  const { t } = useTranslation('engineering');
  const { id } = useParams<{ id: string }>() as { id: string };
  const { validate, update } = useUpdateElevator();
  const { getData, isLoading } = useGetCurrentElevator();
  const [initialAddress, setInitialAddress] = useState<{
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  }>();
  const navigate = useNavigate();

  const initialValues: ValuesType = {};

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<ValuesType>({
      initialValues,
      validate,
      onSubmit: async (body) => {
        const data = await update({ data: body, id });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ENGINEERING_ELEVATORS]());
        }
      },
    });

  const handleChangeSelection = useCallback(
    ({ entrance }: { entrance?: number }) => {
      if (entrance) {
        setFieldValue('entrance_id', entrance);
      }
    },
    [setFieldValue],
  );

  const handleLoadData = useCallback(async () => {
    const oldData = await getData(id);
    setValues({
      entrance_id: oldData?.entrance?.id,
      ip_address: oldData?.ip_address,
      registry_address: oldData?.registry_address,
    });

    const address = {
      street: oldData?.entrance?.building.street
        ? {
            value: oldData?.entrance?.building.street.id,
            label: oldData?.entrance.building.street.name,
          }
        : undefined,
      building: oldData?.entrance?.building
        ? {
            value: oldData?.entrance.building.id,
            label: oldData?.entrance.building.name,
          }
        : undefined,
      entrance: oldData?.entrance
        ? {
            value: oldData?.entrance.id,
            label: oldData?.entrance.name,
          }
        : undefined,
    };
    setInitialAddress(address);
  }, [getData, id, setValues]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    handleSubmit,
    isValid,
    t,
    handleChangeSelection,
    isLoading,
    initialAddress,
  };
};
