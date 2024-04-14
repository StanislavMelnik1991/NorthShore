import { useTranslation } from "react-i18next";
import { ContentWidget } from "@widgets/Content";
import { PageSkeleton } from "@entities/skeletons";
import { Tab } from "@entities/Tab";
import { Card, Text } from "@shared/ui";

const MainPage = () => {
  const { t } = useTranslation("news");
  const labels = [
    <Text variant="body16" fontWeight="medium" key={"tab-label-1"}>
      {t("editor.versions.ru")}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={"tab-label-2"}>
      {t("editor.versions.en")}
    </Text>,
  ];
  const tabs = [
    <ContentWidget
      date={new Date()}
      created_at={new Date()}
      html="<div>text</div>"
      title="фывфывфыв"
      key={"tab-content-1"}
    />,
    <ContentWidget
      date={new Date()}
      created_at={new Date()}
      html="<div>text</div>"
      title="asdasd"
      key={"tab-content-1"}
    />,
  ];
  return (
    <PageSkeleton>
      <Card>
        <Tab labels={labels} tabs={tabs} />
      </Card>
    </PageSkeleton>
  );
};

export default MainPage;
