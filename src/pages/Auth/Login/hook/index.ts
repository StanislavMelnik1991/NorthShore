import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@features/User';
import { AppRoutes, AppRoutesEnum, ROLES_STAFF } from '@shared/constants';

export const useLoginPage = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { login, validate } = useLogin();

  const initialValues = {
    account_number: '',
    password: '',
  };
  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validate,
    onSubmit: async (body) => {
      const user = await login(body);
      if (user) {
        if (ROLES_STAFF.includes(user?.group.id)) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN]());
        } else {
          navigate(AppRoutes[AppRoutesEnum.MAIN]());
        }
      }
    },
  });

  return {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    t,
  };
};
