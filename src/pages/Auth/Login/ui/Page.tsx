import { PageHeader } from "@entities/PageHeader";
import { PasswordField } from "@entities/PasswordField";
import { PageLayout } from "@shared/layouts";
import { Button, Card, TextField } from "@shared/ui";
import { useLogin } from "../hook/useLogin";

export default () => {
  const { errors, handleSubmit, setFieldValue, values } = useLogin();
  return (
    <PageLayout>
      <PageHeader breadcrumbs={[{ href: "", title: "Авторизация" }]} />
      <form onSubmit={handleSubmit}>
        <Card padding={12} gap={20} flexDirection="column">
          <TextField
            value={values.email}
            onChange={(ev) => setFieldValue("email", ev.target.value)}
            label="email"
            error={errors.email}
          />
          <PasswordField
            value={values.password}
            onChange={(ev) => setFieldValue("password", ev.target.value)}
            label="пароль"
            error={errors.password}
          />
          <Button type="submit">Войти</Button>
        </Card>
      </form>
    </PageLayout>
  );
};
