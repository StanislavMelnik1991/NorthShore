import classNames from 'classnames';
import { MeetingCard, VotingCard } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconArrow } from '@shared/icons';
import { Slider } from '@shared/ui';
import { useActivitiesSlider } from '../hook';
import styles from './Slider.module.scss';

interface Props {
  className?: string;
  slidesOnPage: number;
  defaultSlide?: number;
  gap?: number;
}

export const ActivitiesSlider = ({
  className,
  slidesOnPage,
  defaultSlide = 0,
  gap,
}: Props) => {
  const { lang, activities, setSlide, slide } = useActivitiesSlider({
    defaultSlide,
  });
  const activitiesSlides = activities.map((el) => {
    if (el.is_meeting) {
      return (
        <MeetingCard
          title={el.title[lang] || ''}
          key={`voting-card-${el.id}`}
          date={new Date((el.published_at ? el.published_at : 0) * 1000)}
          deadLine={new Date(el.target_date ? el.target_date : 0 * 1000)}
          link={AppRoutes[AppRoutesEnum.ACTIVITY_MEETINGS_CURRENT](el.id)}
        />
      );
    } else {
      return (
        <VotingCard
          title={el.title[lang] || ''}
          key={`voting-card-${el.id}`}
          date={new Date((el.date_add ? el.date_add : 0) * 1000)}
          deadLine={new Date((el.date_finish ? el.date_finish : 0) * 1000)}
          link={AppRoutes[AppRoutesEnum.ACTIVITY_VOTING_CURRENT](el.id)}
        />
      );
    }
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
        slides={activitiesSlides}
        slidesOnPage={slidesOnPage}
        gap={gap}
      />
      <button
        onClick={() => {
          setSlide((val) => val + 1);
        }}
        className={classNames(styles.next, styles.icon)}
        disabled={slide >= activities.length - slidesOnPage}
      >
        <IconArrow rotate={180} />
      </button>
    </div>
  );
};
