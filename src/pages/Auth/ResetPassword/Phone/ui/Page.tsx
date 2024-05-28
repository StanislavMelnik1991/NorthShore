import {
  AuthSkeleton,
  ConfirmCode,
  FullWidthSkeleton,
  ResetPassword,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum, ResendMethodsEnum } from '@shared/constants';
import { Slider } from '@shared/ui';
import { usePage } from '../hook';

export default () => {
  const {
    errors,
    handleSubmit,
    setFieldValue,
    values,
    t,
    handleResend,
    handleSendCode,
    isValid,
    setTarget,
    slide,
    target,
    targetError,
  } = usePage();
  const slides = [
    <ResetPassword
      setValue={setTarget}
      changeMethod={{
        text: t('actions.useMail'),
        to: AppRoutes[AppRoutesEnum.AUTH_RESTORE_PASSWORD_EMAIL](),
      }}
      placeholder={t('phone_number.placeholder')}
      submitDisabled={!target || target.length < 2}
      text={t('routes.restore.description')}
      title={t('routes.restore.title')}
      value={target}
      error={targetError}
      key={'reset_form'}
      handleSubmit={handleSendCode}
    />,
    <ConfirmCode
      handleResend={handleResend(ResendMethodsEnum.sms)}
      setCode={(val) => setFieldValue('phone_code', val)}
      code={values.phone_code}
      text={`${t('code.phone')} ${target}`}
      title={t('routes.code')}
      error={errors.phone_code}
      submitDisabled={!isValid}
      key={'confirm-code-phone'}
    />,
  ];
  return (
    <form onSubmit={handleSubmit}>
      <FullWidthSkeleton>
        <AuthSkeleton>
          <Slider
            activeSlide={slide}
            slides={slides}
            slidesOnPage={1}
            gap={20}
          />
        </AuthSkeleton>
      </FullWidthSkeleton>
    </form>
  );
};
