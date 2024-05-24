import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@features/User';

interface ValuesType {
  name?: string;
  surname?: string;
}

export const useUserName = () => {
  const { t } = useTranslation('settings');
  const { user, handleUpdate } = useUser();

  const onSubmit = useCallback(
    (data: ValuesType) => {
      handleUpdate(data);
    },
    [handleUpdate],
  );

  const { values, setFieldValue, handleSubmit, handleReset } =
    useFormik<ValuesType>({
      initialValues: { name: user?.name, surname: '' },
      onSubmit,
    });

  return {
    t,
    values,
    setFieldValue,
    handleSubmit,
    handleReset,
    isDisabled: values.name === user?.name,
  };
};
