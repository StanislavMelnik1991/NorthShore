import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SafeParseError, z } from 'zod';
import { useCreateCamera } from '@features/security/cameras';
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
  const { create, validate } = useCreateCamera();
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
        message: 'Строка должна содержать два числа, разделенных запятой',
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

  const { values, errors, setFieldValue, handleSubmit, isValid } =
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
      onSubmit: async (body) => {
        const [lat, lon] = values.point
          .split(',')
          .map((val) => Number(val.trim()));
        const data = await create({ ...body, name: body.comment, lat, lon });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.SECURITY_VIDEO]());
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
