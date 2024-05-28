import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useConfirmation,
  useResendCode,
  useUserInfoShort,
} from '@features/User';
import { ISetFieldValue } from '@entities/types';
import {
  AppRoutes,
  AppRoutesEnum,
  ROLES_STAFF,
  ResendMethodsEnum,
  ResendReasonsEnum,
} from '@shared/constants';

type ValuesType = {
  phone_code?: string | undefined;
  email_code?: string | undefined;
};

export const usePage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { resend } = useResendCode();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { confirm, validate } = useConfirmation();
  const { data, getData } = useUserInfoShort();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    getData(id);
  }, [id, getData]);

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<ValuesType>({
      initialValues: {},
      validate,
      onSubmit: async (body) => {
        const user = await confirm({ body, id });
        if (user) {
          if (ROLES_STAFF.includes(user?.group.id)) {
            navigate(AppRoutes[AppRoutesEnum.ADMIN]());
          } else {
            navigate(AppRoutes[AppRoutesEnum.MAIN]());
          }
        } else {
          setSlide(0);
        }
      },
    });

  const handleResend = useCallback(
    (method: ResendMethodsEnum) => () => {
      resend({
        body: {
          reason: ResendReasonsEnum.Register,
          target_method: method,
        },
        id,
      });
    },
    [id, resend],
  );

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    handleSubmit,
    handleResend,
    data,
    t,
    slide,
    setSlide,
    isValid,
  };
};
