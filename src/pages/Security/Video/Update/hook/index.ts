import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { SafeParseError, z } from 'zod';
import { useGetCurrentCamera } from '@features/security';
import { useUpdateCamera } from '@features/security';
import { ISelectOption } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Data = {
  rtsp_url: string;
  rtsp_url_small: string;
  type_id: number;
  entrances_ids: number[];
  address_entrance_id?: number | undefined;
  address_building_id?: number | undefined;
  address_street_id?: number | undefined;
  comment?: string | undefined;
  name?: string | undefined;
  point: string;
};

export const useCreateCameraPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, getData, isLoading } = useGetCurrentCamera(id as string);
  const { update, validate } = useUpdateCamera(id as string);
  const { t } = useTranslation('security');
  const navigate = useNavigate();
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
    rtsp_url: '',
    rtsp_url_small: '',
    address_street_id: undefined,
    address_building_id: undefined,
    address_entrance_id: undefined,
    comment: undefined,
    point: '',
    entrances_ids: [],
    type_id: 1,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<Data>({
      initialValues,
      validate: (values) => {
        const res = schema.safeParse(values) as SafeParseError<ValuesType>;
        if (res.error) {
          const schemeErrors = res.error.formErrors.fieldErrors;
          const apiErrors = validate({
            ...values,
            name: values.comment,
            lat: NaN,
            lon: NaN,
          });
          const totalErrors = { ...apiErrors, ...schemeErrors };
          return totalErrors;
        }
        const [lat, lon] = values.point
          .split(',')
          .map((val) => Number(val.trim()));
        return validate({ ...values, name: values.comment, lat, lon });
      },
      onSubmit: async ({ point, ...body }) => {
        const [lat, lon] = point.split(',').map((val) => Number(val.trim()));
        const data = await update({ ...body, name: body.comment, lat, lon });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.SECURITY_VIDEO]());
        }
      },
    });

  useEffect(() => {
    if (data) {
      setValues({
        point: `${data.lat}, ${data.lon}`,
        entrances_ids: data.entrances_ids,
        rtsp_url: data.rtsp_url,
        rtsp_url_small: data.rtsp_url_small,
        type_id: data.type_id,
        address_building_id: data.building?.id,
        address_entrance_id: data.entrance?.id,
        address_street_id: data.street?.id,
        comment: data.comment,
        name: data.name,
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
    isLoading,
    initialAddress,
    initialAccessAddress,
    t,
  };
};
