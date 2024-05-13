import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import sanitizeHtml from 'sanitize-html';
import { Announcement, StyledRangeDatePicker } from '@entities/components';
import { IAnnouncement } from '@entities/types';
import {
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from '@shared/constants';
import { SCROLLING_CONTAINER_ID } from '@shared/constants/scrolling';
import { IconCalendar, IconArrow } from '@shared/icons';
import { Loader } from '@shared/ui';
import { useTechnicalWorks } from '../hook';
import styles from './Announcements.module.scss';

interface Props {
  showFilter?: boolean;
  className?: string;
  onClick?: (value: IAnnouncement) => void;
}

export const Announcements = ({ showFilter, className, onClick }: Props) => {
  const {
    announcements,
    t,
    i18n,
    handleLoadAnnouncements,
    hasMore,
    from,
    to,
    handleChange,
    showSelect,
    handleSelectClick,
    selectWrapper,
  } = useTechnicalWorks();
  return (
    <div>
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
      <InfiniteScroll
        className={classNames(styles.cards__wrapper, className)}
        scrollableTarget={SCROLLING_CONTAINER_ID}
        dataLength={announcements.length}
        next={handleLoadAnnouncements}
        hasMore={hasMore}
        loader={
          <div className={styles.loader}>
            <Loader size={80} />
          </div>
        }
        endMessage={''}
      >
        {announcements.map((el, index) => {
          return (
            <Announcement
              title={el.title}
              html={sanitizeHtml(el.body, {
                allowedTags: allowedTagsSanitizer,
                allowedAttributes: allowedAttributesSchema,
                allowedIframeHostnames: allowedIframeHostnamesSchema,
              })}
              key={index}
              date={el.date_add}
              onClick={() => {
                if (onClick) onClick(el);
              }}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
