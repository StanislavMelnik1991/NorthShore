import classNames from 'classnames';
import { imageParser } from '@features/utils/imageParser';
import { EventsCard } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconArrow } from '@shared/icons';
import { Slider } from '@shared/ui/Slider';
import { useEventsSlider } from '../hook';
import styles from './Slider.module.scss';

interface Props {
  className?: string;
  slidesOnPage: number;
  defaultSlide?: number;
  gap?: number;
}

export const EventsSlider = ({
  className,
  slidesOnPage,
  defaultSlide = 0,
  gap,
}: Props) => {
  const { lang, events, setSlide, slide, total } = useEventsSlider({
    defaultSlide,
  });
  const newsSlides = events.map((el) => {
    const cover = el.cover || imageParser(el.html_content[lang])[0];
    return (
      <EventsCard
        link={AppRoutes[AppRoutesEnum.EVENT_CURRENT](el.id)}
        title={el.title[lang]}
        date={new Date(el.target_date * 1000)}
        image={cover}
        key={`news-card-${el.id}`}
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
