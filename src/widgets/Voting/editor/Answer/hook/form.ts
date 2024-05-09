import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeParseError, z } from 'zod';

interface Props {
  value: string;
  image?: string;
}

export const useVotingForm = ({ image, value }: Props) => {
  const { t } = useTranslation();

  const schema = z.object({
    value: z.string({ required_error: t('errors.required') }),
    image: z.string().optional(),
  });

  type ValuesType = z.infer<typeof schema>;
  const validate = useCallback(
    (data: unknown) => {
      const res = schema.safeParse(data) as SafeParseError<ValuesType>;
      if (res.error) {
        return res.error.formErrors.fieldErrors;
      }
    },
    [schema],
  );

  const { errors, validateForm } = useFormik<ValuesType>({
    initialValues: { image, value },
    validate,
    onSubmit: (data) => {
      console.log(data);
    },
  });
  return { errors, validateForm };
};
