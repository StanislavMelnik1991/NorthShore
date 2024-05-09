import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TechWork, StyledRangeDatePicker } from '@entities/components';
import { ITechWork } from '@entities/types';
import { SCROLLING_CONTAINER_ID } from '@shared/constants/scrolling';
import { IconCalendar, IconArrow } from '@shared/icons';
import { Loader } from '@shared/ui';
import { useTechnicalWorks } from '../hook';
import styles from './TechnicalWorks.module.scss';

interface Props {
  showFilter?: boolean;
  className?: string;
  onClick?: (value: { item: ITechWork; period: string }) => void;
}

export const TechnicalWorks = ({ showFilter, className, onClick }: Props) => {
  const {
    techWorks,
    t,
    i18n,
    handleLoadTechnicalWorks,
    hasMore,
    lang,
    from,
    to,
    handleChange,
    showSelect,
    handleSelectClick,
    selectWrapper,
  } = useTechnicalWorks();
  return (
    <InfiniteScroll
      className={classNames(styles.cards__wrapper, className)}
      scrollableTarget={SCROLLING_CONTAINER_ID}
      dataLength={techWorks.length}
      next={handleLoadTechnicalWorks}
      hasMore={hasMore}
      loader={
        <div className={styles.loader}>
          <Loader size={80} />
        </div>
      }
      endMessage={''}
    >
      {showFilter && (
        <div ref={selectWrapper} className={styles.select__wrapper}>
          <div className={styles.select} onClick={handleSelectClick}>
            <div className={styles.select__inner}>
              <IconCalendar fill={'var(--dark-60)'} width={16} height={16} />
              {from && to
                ? from.toLocaleDateString(i18n.language, {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }) +
                  ' - ' +
                  to.toLocaleDateString(i18n.language, {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })
                : t('select')}
            </div>
            <IconArrow
              rotate={-90}
              fill={'var(--dark-100)'}
              width={20}
              height={20}
            />
          </div>
          {showSelect && (
            <StyledRangeDatePicker
              className={styles.dataPicker}
              startDate={from}
              endDate={to}
              onChange={handleChange}
            />
          )}
        </div>
      )}

      {techWorks.map((el, index) => {
        let period = '';
        if (el.date_start)
          period +=
            t('from') +
            ' ' +
            new Date(el.date_start).toLocaleDateString(i18n.language, {
              day: 'numeric',
              month: 'long',
              year:
                new Date(el.date_end).getFullYear >
                new Date(el.date_start).getFullYear
                  ? 'numeric'
                  : undefined,
            }) +
            ' ';
        if (el.date_end)
          period +=
            t('to') +
            ' ' +
            new Date(el.date_end).toLocaleDateString(i18n.language, {
              day: 'numeric',
              month: 'long',
              year:
                new Date(el.date_end).getFullYear >
                new Date(el.date_start).getFullYear
                  ? 'numeric'
                  : undefined,
            });
        period = period[0].toUpperCase() + period.slice(1);
        return (
          <TechWork
            title={el.title[lang]}
            text={el.body[lang]}
            key={index}
            period={period}
            image={el.type.icon_site}
            onClick={() => {
              if (onClick) onClick({ item: el, period: period });
            }}
          />
        );
      })}
    </InfiniteScroll>
  );
};
