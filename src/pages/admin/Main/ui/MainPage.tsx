import { PageSkeleton, UserGreetings } from '@entities/components';
import { useMainPage } from '../hook';
import styles from './Main.module.scss';

const MainPage = () => {
  const { dateString, userGreetingsMessage } = useMainPage();

  return (
    <PageSkeleton className={styles.wrapper}>
      <UserGreetings date={dateString} title={userGreetingsMessage} />
    </PageSkeleton>
  );
};

export default MainPage;
