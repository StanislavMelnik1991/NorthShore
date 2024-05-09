import { FormikErrors } from 'formik';

export type ISetFieldValue<T> = (
  field: keyof T,
  value: T[keyof T],
  shouldValidate?: boolean | undefined,
) => Promise<void> | Promise<FormikErrors<T>>;
