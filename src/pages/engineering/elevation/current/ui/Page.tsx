import { Link } from 'react-router-dom';
import {
  MainEngineeringDetails,
  ConfigEngineeringDetails,
} from '@widgets/engineering';
import { PageLoader } from '@widgets/PageLoader';
import {
  CurrentSkeleton,
  PageHeader,
  PageSkeleton,
  Tab,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPencil } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import { useCurrentEnergy } from '../hook';
import styles from './Page.module.scss';

const Page = () => {
  const { data, isLoading, t, id } = useCurrentEnergy();

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
            title: t('routes.elevators.list'),
            href: AppRoutes[AppRoutesEnum.ENGINEERING_ELEVATORS](),
          },
          {
            title: `${t('routes.elevators.list')} №${id}`,
          },
        ]}
      />

      <CurrentSkeleton className={styles.content} isLoading={isLoading}>
        <Tab
          labels={labels}
          tabs={[
            <MainEngineeringDetails
              key={`main_camera_information-${data.id}`}
              data={data}
            />,
            <ConfigEngineeringDetails
              key={`main_camera_information-${data.id}`}
              data={data}
            />,
          ]}
        />
        <Link
          className={styles.link}
          to={AppRoutes[AppRoutesEnum.ENGINEERING_ELEVATOR_UPDATE](
            id as string,
          )}
        >
          <Button className={styles.button} variant="text">
            <IconPencil />
            {t('controls.edit')}
          </Button>
        </Link>
      </CurrentSkeleton>
    </PageSkeleton>
  );
};

export default Page;
