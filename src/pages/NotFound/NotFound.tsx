/* eslint-disable i18next/no-literal-string */
import { PageLoader } from "@widgets/PageLoader";
import { PageSkeleton } from "@entities/skeletons";
import { Title } from "@shared/ui";

const NotFoundPage = () => {
  return (
    <PageSkeleton>
      <Title fontWeight="semibold" variant="h1">
        Not found
      </Title>
      <PageLoader />
    </PageSkeleton>
  );
};

export default NotFoundPage;
