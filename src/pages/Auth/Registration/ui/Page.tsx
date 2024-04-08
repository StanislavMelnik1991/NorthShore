import { PageHeader } from "@entities/PageHeader";
import { PageLayout } from "@shared/layouts";
import { Card, TextField } from "@shared/ui";

export default () => {
  return (
    <PageLayout>
      <PageHeader breadcrumbs={[{ href: "", title: "Регистрация" }]} />
      <Card padding={12} gap={20} flexDirection="column">
        <TextField label="email" />
        <TextField label="пароль" />
      </Card>
    </PageLayout>
  );
};
