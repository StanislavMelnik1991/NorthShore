import classNames from "classnames";
import { extractTextFromHtml } from "@features/utils/sanitazeHtml";
import { NewsCard } from "@entities/cards";
import { PageSkeleton } from "@entities/skeletons";
import { getRouteCurrentNews } from "@shared/constants";
import { IconArrow } from "@shared/icons";
import { Title } from "@shared/ui";
import { Slider } from "@shared/ui/Slider";
import { sliderConfig } from "../config";
import { useMainPage } from "../hook";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const { t, data, lang, setSlide, slide, total } = useMainPage();

  const slides = data.map((el) => {
    return (
      <NewsCard
        link={getRouteCurrentNews(el.id)}
        title={el.title[lang]}
        text={extractTextFromHtml(el.html_content[lang])}
        image={el.cover}
        key={`news-card-${el.id}`}
      />
    );
  });

  return (
    <PageSkeleton>
      <Title variant="h2" fontWeight="semibold">
        {t("sidebar.news")}
      </Title>
      <div className={styles.slider}>
        <button
          onClick={() => {
            setSlide((val) => val - 1);
          }}
          className={classNames(styles.prev, styles.icon)}
          disabled={slide === 0}
        >
          <IconArrow />
        </button>
        <Slider activeSlide={slide} slides={slides} {...sliderConfig} />
        <button
          onClick={() => {
            setSlide((val) => val + 1);
          }}
          className={classNames(styles.next, styles.icon)}
          disabled={slide === total - sliderConfig.slidesOnPage}
        >
          <IconArrow rotate={180} />
        </button>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
