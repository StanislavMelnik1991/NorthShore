import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { Announcements } from '@widgets/announcements';
import { TechnicalWorks } from '@widgets/technicalWorks';
import { PageSkeleton, UserGreetings, Modal } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import {
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from '@shared/constants';
import { Text } from '@shared/ui';
import { useMainPage } from '../hook';
import styles from './Main.module.scss';

const MainPage = () => {
  const {
    dateString,
    userGreetingsMessage,
    activeTechWork,
    setActiveTechWork,
    lang,
    activeAnnouncement,
    setActiveAnnouncement,
    i18n,
  } = useMainPage();
  const { t } = useTranslation();

  return (
    <PageSkeleton className={styles.wrapper}>
      <Modal
        isOpen={!!activeTechWork}
        onClose={() => {
          {
            setActiveTechWork(undefined);
          }
        }}
      >
        <div className={styles.modal__inner}>
          <Text
            className={styles.textContent}
            variant="body16"
            fontWeight="regular"
          >
            {activeTechWork?.period}
          </Text>
          <Text className={styles.title}>
            {activeTechWork?.item.title[lang]}
          </Text>
          {activeTechWork?.item.url && (
            <Link className={styles.link} to={activeTechWork.item.url}>
              {t('details')}
            </Link>
          )}
          <Text className={styles.text} fontWeight="regular" variant="body16">
            {activeTechWork?.item.body[lang]}
          </Text>
        </div>
      </Modal>
      <Modal
        isOpen={!!activeAnnouncement}
        onClose={() => {
          {
            setActiveAnnouncement(undefined);
          }
        }}
      >
        <div className={styles.modal__inner}>
          {activeAnnouncement?.date_add && (
            <Text
              className={styles.timeStamp}
              variant="body14"
              fontWeight="regular"
            >
              {new Date(activeAnnouncement.date_add * 1000).toLocaleDateString(
                i18n.language,
                {
                  day: 'numeric',
                  month: 'long',
                },
              )}
            </Text>
          )}
          <Text className={styles.title}>{activeAnnouncement?.title}</Text>
          {activeAnnouncement?.body && (
            <div
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(activeAnnouncement.body, {
                  allowedTags: allowedTagsSanitizer,
                  allowedAttributes: allowedAttributesSchema,
                  allowedIframeHostnames: allowedIframeHostnamesSchema,
                }),
              }}
            />
          )}
        </div>
      </Modal>
      <UserGreetings date={dateString} title={userGreetingsMessage} />
      <div className={styles.main__wrapper}>
        <div className={styles.left}>
          <div className={styles.block__header}>
            <Text className={styles.title}> {t('sidebar.announcements')}</Text>
            <Link
              className={styles.title__text}
              to={AppRoutes[AppRoutesEnum.ADMIN_INFO_ANNOUNCEMENTS]()}
            >
              {t('all')}
            </Link>
          </div>
          <Announcements
            className={styles.left__inner}
            onClick={(el) => {
              setActiveAnnouncement(el);
            }}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.block__header}>
            <Text className={styles.title}> {t('sidebar.technicalWorks')}</Text>
            <Link
              className={styles.title__text}
              to={AppRoutes[AppRoutesEnum.ADMIN_INFO_TECHNICAL_WORKS]()}
            >
              {t('all')}
            </Link>
          </div>
          <TechnicalWorks
            className={styles.right__inner}
            onClick={({ item: el, period: period }) => {
              setActiveTechWork({ item: el, period: period });
            }}
          />
        </div>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
