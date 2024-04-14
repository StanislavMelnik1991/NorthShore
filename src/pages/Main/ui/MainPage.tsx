import classNames from "classnames";
import { extractTextFromHtml } from "@features/utils/sanitazeHtml";
import { EventsCard, NewsCard } from "@entities/cards";
import { PageSkeleton } from "@entities/skeletons";
import { getRouteCurrentNews } from "@shared/constants";
import { IconArrow } from "@shared/icons";
import { Title } from "@shared/ui";
import { Slider } from "@shared/ui/Slider";
import { sliderConfig } from "../config";
import { useMainPage } from "../hook";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const {
    t,
    news,
    lang,
    setNewsSlide,
    newsSlide,
    newsTotal,
    eventsTotal,
    events,
    eventsSlide,
    setEventsSlide,
  } = useMainPage();

  const newsSlides = news.map((el) => {
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
  const eventsSlides = events.map((el) => {
    return (
      <EventsCard
        link={getRouteCurrentNews(el.id)}
        title={el.title[lang]}
        date={new Date(el.target_date * 1000)}
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
            setNewsSlide((val) => val - 1);
          }}
          className={classNames(styles.prev, styles.icon)}
          disabled={newsSlide === 0}
        >
          <IconArrow />
        </button>
        <Slider activeSlide={newsSlide} slides={newsSlides} {...sliderConfig} />
        <button
          onClick={() => {
            setNewsSlide((val) => val + 1);
          }}
          className={classNames(styles.next, styles.icon)}
          disabled={newsSlide === newsTotal - sliderConfig.slidesOnPage}
        >
          <IconArrow rotate={180} />
        </button>
      </div>
      <Title variant="h2" fontWeight="semibold">
        {t("poster")}
      </Title>
      <div className={styles.slider}>
        <button
          onClick={() => {
            setEventsSlide((val) => val - 1);
          }}
          className={classNames(styles.prev, styles.icon)}
          disabled={eventsSlide === 0}
        >
          <IconArrow />
        </button>
        <Slider
          activeSlide={eventsSlide}
          slides={eventsSlides}
          {...sliderConfig}
        />
        <button
          onClick={() => {
            setEventsSlide((val) => val + 1);
          }}
          className={classNames(styles.next, styles.icon)}
          disabled={eventsSlide === eventsTotal - sliderConfig.slidesOnPage}
        >
          <IconArrow rotate={180} />
        </button>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
