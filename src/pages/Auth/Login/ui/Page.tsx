import { PageLayout } from "@widgets/layouts";
import { PageHeader } from "@entities/PageHeader";
import { PasswordField } from "@entities/PasswordField";
import { Button, Card, TextField } from "@shared/ui";
import { useLogin } from "../hook";

export default () => {
  const { errors, handleSubmit, setFieldValue, values, t } = useLogin();
  return (
    <PageLayout>
      <PageHeader breadcrumbs={[{ href: "", title: t("route") }]} />
      <form onSubmit={handleSubmit}>
        <Card padding={12} gap={20} flexDirection="column">
          <TextField
            value={values.email}
            onChange={(ev) => setFieldValue("email", ev.target.value)}
            label={t("email.label")}
            error={errors.email}
          />
          <PasswordField
            value={values.password}
            onChange={(ev) => setFieldValue("password", ev.target.value)}
            label={t("password.label")}
            error={errors.password}
          />
          <Button type="submit">{t("controls.login")}</Button>
        </Card>
      </form>
    </PageLayout>
  );
};
