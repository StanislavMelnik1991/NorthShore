import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateElevator } from '@features/engineering';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type ValuesType = {
  entrance_id?: number;
  ip_address?: string;
  registry_address?: string;
};

export const useCreatePage = () => {
  const { validate, create } = useCreateElevator();
  const { t } = useTranslation('engineering');
  const navigate = useNavigate();

  const initialValues: ValuesType = {};

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<ValuesType>({
      initialValues,
      validate,
      onSubmit: async (body) => {
        const data = await create(body);
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

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    handleSubmit,
    isValid,
    t,
    handleChangeSelection,
  };
};
