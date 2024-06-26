import { Link } from 'react-router-dom';
import { RequestList } from '@widgets/invocation';
import { PageHeader, PageSkeleton, Tab } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPlus } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import { useRequestMainPage } from '../hooks';

const Page = () => {
  const { t } = useRequestMainPage();
  const labels = [
    <Text variant="body16" fontWeight="medium" key={`tab-label-actual`}>
      {t('tabs.actual')}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={`tab-label-completed`}>
      {t('tabs.completed')}
    </Text>,
  ];

  const tabs = [
    <RequestList key={`RequestList-0`} isActual />,
    <RequestList key={`RequestList-1`} />,
  ];
  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: t('routes.requests') }]}
        controls={
          <Link to={AppRoutes[AppRoutesEnum.REQUESTS_CREATE]()}>
            <Button>
              <IconPlus width={24} height={24} />
              {t('controls.create')}
            </Button>
          </Link>
        }
      />
      <Tab labels={labels} tabs={tabs} />
    </PageSkeleton>
  );
};

export default Page;
