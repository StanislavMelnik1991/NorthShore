import { Settings } from '@widgets/Settings';
import { PageHeader, PageSkeleton } from '@entities/components';
import { useSettings } from '../hook';

export default () => {
  const { t } = useSettings();
  return (
    <PageSkeleton>
      <PageHeader breadcrumbs={[{ title: t('title') }]} />
      <Settings />
    </PageSkeleton>
  );
};
