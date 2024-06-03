import { Link } from 'react-router-dom';
import { PageLoader } from '@widgets/PageLoader';
import { IntercomConfigInformation, MainInformation } from '@widgets/Security';
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
import { useCurrentIntercomPage } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const { data, isLoading, t, id } = useCurrentIntercomPage();

  const labels = [
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-1`}
    >
      {t('details.tabs.main')}
    </Text>,
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-2`}
    >
      {t('details.tabs.config')}
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
            title: t('modules.intercom'),
            href: AppRoutes[AppRoutesEnum.SECURITY_INTERCOM](),
          },
          {
            title: `${t('modules.intercomSingle')} №${data.id}`,
          },
        ]}
      />
      <CurrentSkeleton padding={0} isLoading={isLoading}>
        <CustomVideo src={data.mp4_url} status={1} controls muted={false} />
      </CurrentSkeleton>
      <CurrentSkeleton className={styles.content} isLoading={isLoading}>
        <Tab
          labels={labels}
          tabs={[
            <MainInformation
              key={`main_camera_information-${data.id}`}
              data={{
                ...data,
                building: data.entrance.building,
                street: data.entrance.building.street,
              }}
            />,
            <IntercomConfigInformation
              key={`main_camera_information-${data.id}`}
              data={data}
            />,
          ]}
        />
        <Link
          className={styles.link}
          to={AppRoutes[AppRoutesEnum.SECURITY_INTERCOM_UPDATE](id as string)}
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
