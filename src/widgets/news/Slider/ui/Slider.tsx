import classNames from 'classnames';
import { extractTextFromHtml } from '@features/utils/html';
import { imageParser } from '@features/utils/imageParser';
import { NewsCard } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconArrow } from '@shared/icons';
import { Slider } from '@shared/ui/Slider';
import { useNewsSlider } from '../hook';
import styles from './Slider.module.scss';

interface Props {
  className?: string;
  slidesOnPage: number;
  defaultSlide?: number;
  gap?: number;
}

export const NewsSlider = ({
  className,
  slidesOnPage,
  defaultSlide = 0,
  gap,
}: Props) => {
  const { lang, news, setSlide, slide, total } = useNewsSlider({
    defaultSlide,
  });
  const newsSlides = news.map((el) => {
    const cover = el.cover || imageParser(el.html_content[lang])[0];
    return (
      <NewsCard
        link={AppRoutes[AppRoutesEnum.NEWS_CURRENT](el.id)}
        title={el.title[lang]}
        text={extractTextFromHtml(el.html_content[lang])}
        image={cover}
        key={`news-card-${el.id}`}
        published_date={new Date(el.published_at * 1000)}
      />
    );
  });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <button
        onClick={() => {
          setSlide((val) => val - 1);
        }}
        className={classNames(styles.prev, styles.icon)}
        disabled={slide === 0}
      >
        <IconArrow />
      </button>
      <Slider
        activeSlide={slide}
        slides={newsSlides}
        slidesOnPage={slidesOnPage}
        gap={gap}
      />
      <button
        onClick={() => {
          setSlide((val) => val + 1);
        }}
        className={classNames(styles.next, styles.icon)}
        disabled={slide === total - slidesOnPage}
      >
        <IconArrow rotate={180} />
      </button>
    </div>
  );
};
