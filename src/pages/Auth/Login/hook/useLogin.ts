import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useUser } from '@features/User/hook';
import { axiosApi } from '@entities/api';
import { BaseResponse, ILoginResponse } from '@entities/types';
import {
  AppRoutes,
  AppRoutesEnum,
  TOKEN_LOCAL_STORAGE_KEY,
  ROLES_ADMIN,
} from '@shared/constants';

export const useLogin = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { setUser } = useUser();
  const schema = z
    .object({
      account_number: z.string(),
      password: z.string().min(4),
    })
    .required();

  type ValuesType = z.infer<typeof schema>;
  const initialValues: ValuesType = {
    account_number: '',
    password: '',
  };
  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validate: (values) => {
      try {
        schema.parse(values);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        return error.formErrors.fieldErrors;
      }
    },
    onSubmit: async (body) => {
      try {
        const {
          data: {
            data: { token, ...user },
          },
        } = await axiosApi.post<BaseResponse<ILoginResponse>>(
          '/auth/login',
          body,
        );
        setUser?.(user);
        const isAdmin = (user && ROLES_ADMIN.includes(user?.group.id)) || false;
        if (isAdmin) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN]());
        } else {
          navigate(AppRoutes[AppRoutesEnum.MAIN]());
        }
        toast.success(`${t('toast.loginSuccess')} ${user.name}`);
        localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
      } catch (error) {
        console.error(error);
        toast.error(t('toast.loginError'));
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
