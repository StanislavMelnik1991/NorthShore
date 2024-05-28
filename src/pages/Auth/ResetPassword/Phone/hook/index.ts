import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SafeParseError, z } from 'zod';
import {
  useConfirmation,
  usePasswordResetRequest,
  useResendCode,
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
  const { resend } = usePasswordResetRequest();
  const { resend: resendCode } = useResendCode();
  const { confirm, validate } = useConfirmation();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | number>();
  const [target, setTarget] = useState<string>();
  const [targetError, setTargetError] = useState<string>();

  const targetSchema = z.string().email();

  const handleSendCode = useCallback(async () => {
    const data = await resend({
      target,
      target_method: ResendMethodsEnum.sms,
    });
    if (data && data.id) {
      setUserId(data.id);
    }
  }, [resend, target]);

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<ValuesType>({
      initialValues: {},
      validate,
      onSubmit: async (body) => {
        if (!userId) {
          return;
        }
        const user = await confirm({ body, id: userId });
        if (user) {
          if (ROLES_STAFF.includes(user?.group.id)) {
            navigate(AppRoutes[AppRoutesEnum.ADMIN]());
          } else {
            navigate(AppRoutes[AppRoutesEnum.MAIN]());
          }
        } else {
          setUserId(undefined);
        }
      },
    });

  const handleResend = useCallback(
    (method: ResendMethodsEnum) => () => {
      if (!userId) {
        return;
      }
      resendCode({
        body: {
          reason: ResendReasonsEnum.PasswordReset,
          target_method: method,
        },
        id: userId,
      });
    },
    [resendCode, userId],
  );

  const handleSetTarget = useCallback(
    (val?: string) => {
      setTarget(val);
      const res = targetSchema.safeParse(val) as SafeParseError<string>;
      if (res.error) {
        setTargetError(t('errors.invalidFormat'));
      } else {
        setTargetError(undefined);
      }
    },
    [t, targetSchema],
  );

  return {
    t,
    slide: userId ? 1 : 0,
    handleResend,
    setTarget: handleSetTarget,
    target,
    handleSendCode,
    errors,
    handleSubmit,
    isValid,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    values,
    targetError,
  };
};
