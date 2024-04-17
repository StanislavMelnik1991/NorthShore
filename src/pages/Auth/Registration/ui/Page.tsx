import { PageHeader, PageSkeleton } from '@entities/components';
import { Card, TextField } from '@shared/ui';

export default () => {
  return (
    <PageSkeleton>
      <PageHeader breadcrumbs={[{ href: '', title: 'Регистрация' }]} />
      <Card padding={12} gap={20} flexDirection="column">
        <TextField label="email" />
        <TextField label="пароль" />
      </Card>
    </PageSkeleton>
  );
};
