import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@features/User';
import { ISetFieldValue } from '@entities/types';

interface ValuesType {
  email?: string;
}

export const useUserEmail = () => {
  const { t } = useTranslation('settings');
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const { values, setFieldValue, handleSubmit, errors } = useFormik<ValuesType>(
    {
      initialValues: {},
      onSubmit: () => {
        handleClose();
      },
    },
  );

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
    user,
    isOpen,
    handleOpen,
    handleClose,
    values,
    setFieldValue: customSetFieldValue,
    handleSubmit,
    errors,
  };
};
