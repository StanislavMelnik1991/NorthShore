import classNames from 'classnames';
import { InvocationCard } from '@entities/components';
import { NoResults } from '@entities/components/NoResults';
import { useList } from '../hook';
import styles from './List.module.scss';

interface Props {
  className?: string;
  isActual?: boolean;
}

export const ApplicationsList = ({ className, isActual = false }: Props) => {
  const { t, data } = useList(isActual);
  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.length ? (
        data.map(({ data_add, id, title, status }) => {
          return (
            <InvocationCard
              key={`InvocationCard-${id}`}
              date={new Date(data_add * 1000)}
              id={id}
              title={title}
              type="application"
              status={status.id}
            />
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
