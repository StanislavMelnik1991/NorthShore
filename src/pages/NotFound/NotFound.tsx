/* eslint-disable i18next/no-literal-string */
import { PageLayout } from "@widgets/layouts";
import { PageLoader } from "@widgets/PageLoader";
import { Title } from "@shared/ui";

const NotFoundPage = () => {
  return (
    <PageLayout>
      <Title fontWeight="semibold" variant="h1">
        Not found
      </Title>
      <PageLoader />
    </PageLayout>
  );
};

export default NotFoundPage;
