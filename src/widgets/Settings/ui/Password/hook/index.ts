import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChangePassword } from '@features/User';
import { ISetFieldValue } from '@entities/types';

interface ValuesType {
  password?: string;
  confirmPassword?: string;
  old_password?: string;
}

export const useUserPassword = () => {
  const { t } = useTranslation('settings');
  const { update, validate } = useChangePassword();
  const [isOpen, setIsOpen] = useState(false);

  const handleOnSubmit = useCallback(
    async (values: ValuesType) => {
      const res = await update(values);
      if (res) {
        setIsOpen(false);
      }
    },
    [update],
  );

  const { values, setFieldValue, handleSubmit, errors } = useFormik<ValuesType>(
    {
      initialValues: {},
      validate,
      onSubmit: handleOnSubmit,
    },
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const customSetFieldValue: ISetFieldValue<ValuesType> = useCallback(
    (field, value) => {
      if (value === '') {
        return setFieldValue(field, undefined);
      } else {
        return setFieldValue(field, value);
      }
    },
    [setFieldValue],
  );

  return {
    t,
    isOpen,
    handleOpen,
    handleClose,
    values,
    setFieldValue: customSetFieldValue,
    handleSubmit,
    errors,
  };
};
