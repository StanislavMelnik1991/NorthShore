import { PageHeader, PageSkeleton, Tab } from '@entities/components';
import { Text } from '@shared/ui';
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
  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: t('routes.main') }]}
      />
      <Tab labels={labels} tabs={[]} />
    </PageSkeleton>
  );
};

export default Page;
