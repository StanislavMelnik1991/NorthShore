import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { SafeParseError, z } from 'zod';
import { useGetCurrentAccess, useUpdateAccess } from '@features/security';
import { ISelectOption } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Data = {
  name?: string;
  entrances_ids: number[];
  login?: string;
  password?: string;
  comment?: string;
  ip_address?: string;
  type: ISelectOption | null;
  http_login?: string;
  http_password?: string;
  address_entrance_id?: number;
  address_building_id?: number;
  address_street_id?: number;
  point: string;
};

export const useCreateCameraPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, getData, isLoading } = useGetCurrentAccess(id as string);
  const { update, validate } = useUpdateAccess(id as string);
  const [initialAddress, setInitialAddress] = useState<{
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  }>();
  const [initialAccessAddress, setAccessAddress] = useState<
    Array<{
      street?: ISelectOption;
      building?: ISelectOption;
      entrance?: ISelectOption;
    }>
  >([]);
  const { t } = useTranslation('security');
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [getData]);

  const schema = z.object({
    point: z.string().refine(
      (value) => {
        const parts = value.split(',').map((part) => part.trim());
        return (
          parts.length === 2 && parts.every((part) => !isNaN(parseFloat(part)))
        );
      },
      {
        message: t('errors.invalidPoint'),
      },
    ),
  });
  type ValuesType = z.infer<typeof schema>;

  const initialValues: Data = {
    point: '',
    entrances_ids: [],
    type: null,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<Data>({
      initialValues,
      validate: (body) => {
        const res = schema.safeParse(body) as SafeParseError<ValuesType>;
        if (res.error) {
          const schemeErrors = res.error.formErrors.fieldErrors;
          const apiErrors = validate({
            ...body,
            name: body.comment,
            lat: NaN,
            lon: NaN,
            type_id: body.type?.value,
          });
          const totalErrors = { ...apiErrors, ...schemeErrors };
          return totalErrors;
        }
        const [lat, lon] = body.point
          .split(',')
          .map((val) => Number(val.trim()));
        return validate({
          ...body,
          name: body.comment,
          lat,
          lon,
          type_id: body.type?.value,
        });
      },
      onSubmit: async ({ point, type, ...body }) => {
        const [lat, lon] = point.split(',').map((val) => Number(val.trim()));
        const data = await update({
          ...body,
          name: body.comment,
          lat,
          lon,
          type_id: type?.value,
        });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.SECURITY_ACCESS]());
        }
      },
    });

  useEffect(() => {
    if (data) {
      setValues({
        point: `${data.lat}, ${data.lon}`,
        entrances_ids: data.entrances.map((el) => el.id),
        address_building_id: data.building?.id,
        address_entrance_id: data.entrance?.id,
        address_street_id: data.street?.id,
        comment: data.comment || data.name,
        name: data.name,
        type: { label: data.type.name, value: data.type.id },
        http_login: data.http_login,
        http_password: data.http_password,
        ip_address: data.ip_address,
        login: data.login,
        password: data.password,
      });

      const address = {
        street: data?.street
          ? {
              value: data.street.id,
              label: data.street.name,
            }
          : undefined,
        building: data?.building
          ? {
              value: data.building.id,
              label: data.building.name,
            }
          : undefined,
        entrance: data?.entrance
          ? {
              value: data.entrance.id,
              label: data.entrance.name,
            }
          : undefined,
      };
      setInitialAddress(address);
      const access = data.entrances.map((el) => {
        return {
          entrance: {
            value: el.id,
            label: el.name,
          },
          building: {
            value: el.building.id,
            label: el.building.name,
          },
          street: {
            value: el.building.street.id,
            label: el.building.street.name,
          },
        };
      });
      setAccessAddress(access);
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
    initialAccessAddress,
  };
};
