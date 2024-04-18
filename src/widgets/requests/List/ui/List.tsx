import classNames from 'classnames';
import { useEffect } from 'react';
import { useGetRequestsList } from '@features/invocation';
import { Card } from '@shared/ui';
import styles from './List.module.scss';

interface Props {
  className?: string;
}

export const RequestList = ({ className }: Props) => {
  const { getData, data } = useGetRequestsList();

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.map((el) => {
        return <Card key={`user-requests-${el.id}`}>{el.content}</Card>;
      })}
    </div>
  );
};
