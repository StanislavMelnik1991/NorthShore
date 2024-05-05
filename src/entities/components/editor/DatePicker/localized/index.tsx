import { ReactDatePickerProps } from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@shared/ui';

interface Props extends Omit<ReactDatePickerProps, 'locale' | 'selectsRange'> {
  label?: string;
  error?: string;
  selectsRange?: boolean;
  borderClassName?: string;
}

export const LocalizedDatePicker = (props: Props) => {
  const { i18n } = useTranslation();
  return <DatePicker locale={i18n.language} {...props} />;
};
