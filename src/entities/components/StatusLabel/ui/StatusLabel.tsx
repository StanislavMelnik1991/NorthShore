import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { RequestStatusEnum } from '@shared/constants';
import { IconClockPast, IconDone, IconStar } from '@shared/icons';
import { Text } from '@shared/ui';
import styles from './StatusLabel.module.scss';

interface Props {
  className?: string;
  status: keyof typeof RequestStatusEnum;
}

export const StatusLabel = ({ className, status }: Props) => {
  const { t } = useTranslation('invocation');
  const iconConfig = {
    '1': <IconStar />,
    '2': <IconClockPast />,
    '3': <IconClockPast />,
    '4': <IconDone />,
    '5': <IconDone />,
  };
  return (
    <div
      className={classNames(
        styles.wrapper,
        styles[RequestStatusEnum[status]],
        className,
      )}
    >
      {iconConfig[status]}
      <Text>{t(`status.${RequestStatusEnum[status]}`)}</Text>
    </div>
  );
};
