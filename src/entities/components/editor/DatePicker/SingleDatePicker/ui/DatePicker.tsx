import { LocalizedDatePicker } from '../../localized';

interface Props {
  className?: string;
  value: Date | null;
  setDate(val: Date | null): void;
  label?: string;
  error?: string;
  required?: boolean;
  showTimeSelect?: boolean;
  timeFormat?: string;
  dateFormat?: string;
  borderClassName?: string;
  minDate?: Date | null | undefined;
  maxDate?: Date | null | undefined;
}

export const CustomDatePicker = ({
  className,
  setDate,
  value,
  showTimeSelect = true,
  ...props
}: Props) => {
  return (
    <LocalizedDatePicker
      wrapperClassName={className}
      showIcon
      selected={value}
      showTimeSelect={showTimeSelect}
      onChange={(date) => setDate(date)}
      {...props}
    />
  );
};
