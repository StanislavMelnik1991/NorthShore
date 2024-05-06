import { Link } from 'react-router-dom';
import { PageLoader } from '@widgets/PageLoader';
import { MainInformation } from '@widgets/Security';
import {
  CurrentSkeleton,
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
            title: t('modules.sls_intercom'),
            href: AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM](),
          },
          {
            title: `${t('modules.sslIntercomSingle')} №${data.id}`,
          },
        ]}
      />
      <CurrentSkeleton className={styles.content} isLoading={isLoading}>
        <Tab
          labels={labels}
          tabs={[
            <MainInformation
              key={`main_camera_information-${data.id}`}
              data={{
                ...data,
                comment: undefined,
                apartment: data.apartment,
                entrance: data.apartment.entrance,
                building: data.apartment.entrance.building,
                street: data.apartment.entrance.building.street,
              }}
            />,
          ]}
        />
        <Link
          className={styles.link}
          to={AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM_UPDATE](
            id as string,
          )}
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
