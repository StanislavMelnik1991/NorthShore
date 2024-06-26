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
    t,
    slide,
    handleResend,
    setTarget,
    target,
    handleSendCode,
    errors,
    handleSubmit,
    isValid,
    setFieldValue,
    values,
    targetError,
  } = usePage();
  const slides = [
    <ResetPassword
      setValue={setTarget}
      changeMethod={{
        text: t('actions.usePhone'),
        to: AppRoutes[AppRoutesEnum.AUTH_RESTORE_PASSWORD_PHONE](),
      }}
      placeholder={t('email.placeholder')}
      submitDisabled={!target || target.length < 2}
      text={t('routes.restore.description')}
      title={t('routes.restore.title')}
      value={target}
      error={targetError}
      key={'reset_form'}
      handleSubmit={handleSendCode}
    />,
    <ConfirmCode
      handleResend={handleResend(ResendMethodsEnum.email)}
      setCode={(val) => setFieldValue('email_code', val)}
      code={values.email_code}
      text={`${t('code.mail')} ${target}`}
      title={t('routes.code')}
      submitDisabled={!isValid}
      error={errors.email_code}
      key={'confirm-code-email'}
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
