import classNames from 'classnames';
import { IconShield } from '@shared/icons';
import { Card, Title } from '@shared/ui';
import styles from './Accident.module.scss';

interface Props {
  className?: string;
  title: string;
}

export const Accident = ({ className, title }: Props) => {
  return (
    <Card
      hideShadow
      flexDirection="column"
      className={classNames(styles.wrapper, className)}
    >
      <Title variant="h4" fontWeight="semibold">
        {title}
      </Title>
      <IconShield width={48} height={48} />
    </Card>
  );
};
