import { useTranslation } from "react-i18next";
import { EventsSlider } from "@widgets/events";
import { NewsSlider } from "@widgets/news";
import { PageSkeleton } from "@entities/skeletons";
import { Title } from "@shared/ui";
import { sliderConfig } from "../config";

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <PageSkeleton>
      <Title variant="h2" fontWeight="semibold">
        {t("sidebar.news")}
      </Title>
      <NewsSlider {...sliderConfig} />
      <Title variant="h2" fontWeight="semibold">
        {t("poster")}
      </Title>
      <EventsSlider {...sliderConfig} />
    </PageSkeleton>
  );
};

export default MainPage;
