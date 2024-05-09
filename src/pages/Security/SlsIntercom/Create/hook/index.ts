import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateSlsIntercom } from '@features/security';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Data = {
  uuid?: string;
  name?: string | null;
  comment?: string | null;
  apartment_id?: number;
};

export const useCreateIntercomPage = () => {
  const { create, validate } = useCreateSlsIntercom();
  const { t } = useTranslation('security');
  const navigate = useNavigate();

  const initialValues: Data = {};

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<Data>({
      initialValues,
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await create(body);
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM]());
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
