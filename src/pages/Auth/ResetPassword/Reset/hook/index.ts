import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useChangePassword } from '@features/User';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type ValuesType = {
  password?: string;
  confirmPassword?: string;
};

export const useLoginPage = () => {
  const { update, validate } = useChangePassword();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const { values, errors, setFieldValue, handleSubmit } = useFormik<ValuesType>(
    {
      initialValues: {},
      validate,
      onSubmit: async (body) => {
        const user = await update(body);
        if (user) {
          navigate(AppRoutes[AppRoutesEnum.SETTINGS]());
        }
      },
    },
  );

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    handleSubmit,
    t,
  };
};
