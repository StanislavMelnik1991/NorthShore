import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '@features/User';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum, ROLES_STAFF } from '@shared/constants';

type ValuesType = {
  account_number?: string;
  password?: string;
  name?: string;
  surname?: string;
  phone_number?: string;
  email?: string;
  confirmPassword?: string;
  is_accepted?: boolean;
};

export const useLoginPage = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { signUp, validate } = useRegistration();

  const initialValues = {};
  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<ValuesType>({
      initialValues,
      validate,
      onSubmit: async (body) => {
        const user = await signUp(body);
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
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    handleSubmit,
    t,
    isValid,
  };
};
