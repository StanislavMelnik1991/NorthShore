import { useNavigate } from 'react-router-dom';
import { Card, Title, Text } from '@shared/ui';
import styles from './Card.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
  link: string;
  title: string;
  subtitle?: string;
  img?: string;
  linkIsLocal?: boolean;
}

export const RarusCard = ({
  className,
  link,
  title,
  img,
  subtitle,
  linkIsLocal = false,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => {
        linkIsLocal ? navigate(link) : (document.location.href = link);
      }}
    >
      <Card
        className={classNames(className, styles.inner)}
        gap={20}
        flexDirection="column"
        padding={20}
      >
        <div className={styles.wrapper}>
          <Title fontWeight="semibold" variant="h4">
            {title}
          </Title>
          {subtitle && <Text className={styles.subtitle}>{subtitle}</Text>}
        </div>
        {img && <img src={img} className={styles.image} alt={title} />}
      </Card>
    </div>
  );
};
