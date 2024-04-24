import { Link } from 'react-router-dom';
import { PageLoader } from '@widgets/PageLoader';
import {
  CurrentSkeleton,
  CustomVideo,
  PageHeader,
  PageSkeleton,
  Tab,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPencil } from '@shared/icons';
import { Button } from '@shared/ui';
import { useCreateCameraPage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const { data, isLoading, t, id } = useCreateCameraPage();

  const labels = [t('tabs.main'), t('tabs.config'), t('tabs.access')];

  if (!data) {
    return <PageLoader />;
  }

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            title: t('title'),
            href: AppRoutes[AppRoutesEnum.SECURITY](),
          },
          {
            title: t('modules.video'),
            href: AppRoutes[AppRoutesEnum.SECURITY_VIDEO](),
          },
          {
            title: `${t('cards.camera')} №${data.id}`,
          },
        ]}
      />
      <CurrentSkeleton padding={0} isLoading={isLoading}>
        <CustomVideo src={data.rtsp_url} status={data.status_id || 3} />
      </CurrentSkeleton>
      <CurrentSkeleton className={styles.content} isLoading={isLoading}>
        <Tab labels={labels} tabs={[]} />
        <Link
          className={styles.link}
          to={AppRoutes[AppRoutesEnum.SECURITY_VIDEO_UPDATE](id as string)}
        >
          <Button className={styles.button} variant="text">
            <IconPencil />
            {t('actions.edit')}
          </Button>
        </Link>
      </CurrentSkeleton>
    </PageSkeleton>
  );
};

export default Page;
