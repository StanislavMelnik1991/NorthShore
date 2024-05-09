import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetCurrentSlsIntercom,
  useUpdateSlsIntercom,
} from '@features/security';
import { ISelectOption } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Data = {
  uuid?: string;
  name?: string | null;
  comment?: string | null;
  apartment_id?: number;
};

export const useCreateCameraPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, getData, isLoading } = useGetCurrentSlsIntercom(id as string);
  const { update, validate } = useUpdateSlsIntercom(id as string);
  const [initialAddress, setInitialAddress] = useState<{
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
    apartment?: ISelectOption;
  }>();

  const { t } = useTranslation('security');
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [getData]);

  const initialValues: Data = {};

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<Data>({
      initialValues,
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await update(body);
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM]());
        }
      },
    });

  useEffect(() => {
    if (data) {
      setValues({
        comment: data.comment || data.name,
        name: data.name,
        apartment_id: data.apartment_id,
        uuid: data.uuid,
      });

      const address = {
        street: data?.apartment.entrance.building.street
          ? {
              value: data?.apartment.entrance.building.street.id,
              label: data?.apartment.entrance.building.street.name,
            }
          : undefined,
        building: data?.apartment.entrance.building
          ? {
              value: data?.apartment.entrance.building.id,
              label: data?.apartment.entrance.building.name,
            }
          : undefined,
        entrance: data?.apartment.entrance
          ? {
              value: data?.apartment.entrance.id,
              label: data?.apartment.entrance.name,
            }
          : undefined,
        apartment: data?.apartment
          ? {
              value: data.apartment.id,
              label: data.apartment.name,
            }
          : undefined,
      };
      setInitialAddress(address);
    }
  }, [data, setValues]);

  return {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isValid,
    t,
    isLoading,
    initialAddress,
  };
};
