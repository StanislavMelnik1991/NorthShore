import { Link } from 'react-router-dom';
import { PageLoader } from '@widgets/PageLoader';
import {
  AccessInformation,
  ConfigInformation,
  MainInformation,
} from '@widgets/Security';
import {
  CurrentSkeleton,
  CustomVideo,
  PageHeader,
  PageSkeleton,
  Tab,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPencil } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import { useCreateCameraPage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const { data, isLoading, t, id } = useCreateCameraPage();

  const labels = [
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-1`}
    >
      {t('camera.tabs.main')}
    </Text>,
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-2`}
    >
      {t('camera.tabs.config')}
    </Text>,
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-3`}
    >
      {`${t('camera.tabs.access')} (${data?.entrances.length})`}
    </Text>,
  ];

  if (!data) {
    return <PageLoader />;
  }

  return (
    <PageSkeleton className={styles.wrapper}>
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
        <Tab
          labels={labels}
          tabs={[
            <MainInformation
              key={`main_camera_information-${data.id}`}
              data={data}
            />,
            <ConfigInformation
              key={`main_camera_information-${data.id}`}
              data={data}
            />,
            <AccessInformation
              key={`main_camera_information-${data.id}`}
              data={data}
            />,
          ]}
        />
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
