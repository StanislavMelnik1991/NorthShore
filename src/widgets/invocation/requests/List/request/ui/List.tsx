import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { InvocationCard } from '@entities/components';
import { NoResults } from '@entities/components/NoResults';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useList } from '../hook';
import styles from './List.module.scss';

interface Props {
  className?: string;
  isActual?: boolean;
}

export const RequestList = ({ className, isActual = false }: Props) => {
  const { t, data } = useList(isActual);

  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.length ? (
        data.map(({ data_add, id, title, status }) => {
          return (
            <Link
              key={`InvocationCard-${id}`}
              to={AppRoutes[AppRoutesEnum.REQUESTS_CURRENT](id)}
            >
              <InvocationCard
                date={new Date(data_add * 1000)}
                id={id}
                title={title}
                type="request"
                status={status.id}
              />
            </Link>
          );
        })
      ) : (
        <NoResults
          title={t('noApplications.title')}
          text={t('noApplications.text')}
        />
      )}
    </div>
  );
};
