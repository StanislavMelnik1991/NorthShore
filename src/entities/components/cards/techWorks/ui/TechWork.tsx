import classNames from 'classnames';
import { Card, Text } from '@shared/ui';
import styles from './TechWork.module.scss';

interface Props {
  className?: string;
  image?: string;
  title: string;
  text: string;
  period: string;
  onClick?: () => void;
}

export const TechWork = ({
  className,
  image,
  title,
  text,
  period,
  onClick,
}: Props) => {
  return (
    <div className={styles.card__wrapper} onClick={onClick}>
      <Card className={classNames(className, styles.card)}>
        <div className={styles.header__wrapper}>
          <Text
            className={styles.textContent}
            variant="body13"
            fontWeight="medium"
          >
            {period}
          </Text>
          <img className={styles.image} src={image} />
        </div>
        <Text className={styles.title} fontWeight="semibold" variant="body16">
          {title}
        </Text>
        <Text className={styles.text} fontWeight="regular" variant="body14">
          {text}
        </Text>
      </Card>
    </div>
  );
};
