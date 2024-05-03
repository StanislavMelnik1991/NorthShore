import classNames from 'classnames';
import { ru } from 'date-fns/locale/ru';
import ReactDatePicker from 'react-datepicker';
import { registerLocale, ReactDatePickerProps } from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { IconCalendar } from '../../../icons';
import styles from './DatePicker.module.scss';
registerLocale('ru', ru);

interface Props extends Omit<ReactDatePickerProps, 'selectsRange'> {
  label?: string;
  error?: string;
  selectsRange?: boolean;
  borderClassName?: string;
}

export const DatePicker = ({
  className,
  wrapperClassName,
  error,
  label,
  timeFormat = 'HH:mm',
  dateFormat = 'dd MM yyyy, HH:mm',
  borderClassName,
  ...props
}: Props) => {
  const { i18n } = useTranslation();
  return (
    <div className={classNames(styles.wrapper, wrapperClassName)}>
      {label && (
        <p className={classNames(styles.label, { [styles.error]: !!error })}>
          {label}
        </p>
      )}
      <div
        className={classNames(styles.border, borderClassName, {
          [styles.error]: !!error,
        })}
      >
        <ReactDatePicker
          wrapperClassName={classNames(styles.wrapper, className)}
          locale={i18n.language}
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          icon={<IconCalendar width={20} height={20} />}
          {...props}
        />
      </div>
      {error && (
        <p className={classNames(styles.error, styles.label, styles.errorText)}>
          {error}
        </p>
      )}
    </div>
  );
};
