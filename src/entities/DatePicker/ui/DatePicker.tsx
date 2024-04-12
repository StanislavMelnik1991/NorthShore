import classNames from "classnames";
import DatePicker from "react-datepicker";
import { IconCalendar } from "@shared/icons";
import styles from "./DatePicker.module.scss";

interface Props {
  className?: string;
  startDate: Date | null;
  setStartDate(val: Date | null): void;
  label?: string;
  error?: string;
}

export const CustomDatePicker = ({
  className,
  setStartDate,
  startDate,
  error,
  label,
}: Props) => {
  return (
    <label className={classNames(styles.wrapper)}>
      {label && (
        <p className={classNames(styles.label, { [styles.error]: !!error })}>
          {label}
        </p>
      )}
      <div
        className={classNames(styles.border, {
          [styles.error]: !!error,
        })}
      >
        <DatePicker
          wrapperClassName={classNames(styles.wrapper, className)}
          showIcon
          timeFormat="HH:mm"
          dateFormat="MM dd yyyy, HH:mm"
          selected={startDate}
          showTimeSelect
          icon={<IconCalendar width={20} height={20} />}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      {error && (
        <p className={classNames(styles.error, styles.label, styles.errorText)}>
          {error}
        </p>
      )}
    </label>
  );
};
