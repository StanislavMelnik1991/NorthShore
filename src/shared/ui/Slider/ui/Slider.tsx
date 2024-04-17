import classNames from 'classnames';
import styles from './Slider.module.scss';

type CustomSliderProps = {
  slides: Array<JSX.Element>;
  slidesOnPage: number;
  activeSlide: number;
  className?: string;
  gap?: number;
  transitionDuration?: number;
};

export const Slider = ({
  slides,
  slidesOnPage,
  activeSlide,
  className,
  gap = 20,
  transitionDuration = 250,
}: CustomSliderProps) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div
        className={styles.slider}
        style={{
          gap: `${gap}px`,
          transform: `translate(calc((100% + ${gap}px) * ${-activeSlide} / ${slidesOnPage}), 0)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        {slides.map((el, index) => {
          return (
            <div
              style={{
                width: `calc((100% - (${gap}px * ${
                  slidesOnPage - 1
                })) / ${slidesOnPage})`,
              }}
              className={styles.slide}
              key={`custom-slider-slide${index}`}
            >
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
};
