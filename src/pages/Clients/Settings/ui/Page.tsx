import { Settings } from '@widgets/Settings';
import { PageHeader, PageSkeleton } from '@entities/components';
import { useSettings } from '../hook';

export default () => {
  const { data, t, userConfig } = useSettings();
  return (
    <PageSkeleton>
      <PageHeader breadcrumbs={[{ title: t('title') }]} />
      <Settings userName={data?.name} config={userConfig} />
    </PageSkeleton>
  );
};
