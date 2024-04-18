import { Link } from 'react-router-dom';
import { PageHeader, PageSkeleton, Tab } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPlus } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import { useApplicationsMainPage } from '../hooks';

const Page = () => {
  const { t } = useApplicationsMainPage();
  const labels = [
    <Text variant="body16" fontWeight="medium" key={`tab-label-actual`}>
      {t('tabs.actual')}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={`tab-label-completed`}>
      {t('tabs.completed')}
    </Text>,
  ];
  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          { href: location.pathname, title: t('routes.applications') },
        ]}
        controls={
          <Link to={AppRoutes[AppRoutesEnum.APPLICATIONS_CREATE]()}>
            <Button>
              <IconPlus width={24} height={24} />
              {t('controls.create')}
            </Button>
          </Link>
        }
      />
      <Tab labels={labels} tabs={[]} />
    </PageSkeleton>
  );
};

export default Page;
