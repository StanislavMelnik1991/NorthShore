import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SafeParseError, z } from 'zod';
import { useCreateAccess } from '@features/security';
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
  const { create, validate } = useCreateAccess();
  const { t } = useTranslation('security');
  const navigate = useNavigate();

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

  const { values, errors, setFieldValue, handleSubmit, isValid } =
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
        const data = await create({
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

  return {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isValid,
    t,
  };
};
