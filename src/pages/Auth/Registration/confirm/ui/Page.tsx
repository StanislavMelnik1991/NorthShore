import {
  AuthSkeleton,
  ConfirmCode,
  FullWidthSkeleton,
} from '@entities/components';
import { ResendMethodsEnum } from '@shared/constants';
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
    data,
    setSlide,
    slide,
    isValid,
  } = usePage();
  const slides = [
    <ConfirmCode
      handleResend={handleResend(ResendMethodsEnum.sms)}
      handleSubmit={() => {
        setSlide(1);
      }}
      setCode={(val) => setFieldValue('phone_code', val)}
      code={values.phone_code}
      text={`${t('code.phone')} ${data?.phone_number}`}
      title={t('routes.code')}
      error={errors.phone_code}
      submitDisabled={!values.phone_code || !!errors.phone_code}
      key={'confirm-code-phone'}
    />,
    <ConfirmCode
      handleResend={handleResend(ResendMethodsEnum.email)}
      setCode={(val) => setFieldValue('email_code', val)}
      code={values.email_code}
      text={`${t('code.mail')} ${data?.email}`}
      title={t('routes.code')}
      error={errors.email_code}
      submitDisabled={!isValid || !values.email_code}
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
