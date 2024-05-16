import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCard } from '../hook';
import styles from './Advertisement.module.scss';

interface Props {
  className?: string;
  url: string;
  image: string;
}

export const AdvertisementCard = ({ className, image, url }: Props) => {
  const { wrapperRef, height } = useCard();
  return (
    <Link
      ref={wrapperRef}
      to={url}
      target="_blank"
      style={{ height }}
      className={classNames(styles.wrapper, className)}
    >
      <img className={styles.image} src={image} />
    </Link>
  );
};
