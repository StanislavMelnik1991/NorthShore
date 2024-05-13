import sanitizeHtml from 'sanitize-html';
import { Announcements } from '@widgets/announcements';
import { Modal, PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import {
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from '@shared/constants';
import { Text } from '@shared/ui';
import { useAnnouncements } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { t, i18n, activeItem, setActiveItem } = useAnnouncements();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ADMIN](),
            title: t('main'),
          },
          {
            href: AppRoutes[AppRoutesEnum.ADMIN_INFO_ANNOUNCEMENTS](),
            title: t('title'),
          },
        ]}
      />
      <Modal
        isOpen={!!activeItem}
        onClose={() => {
          {
            setActiveItem(undefined);
          }
        }}
      >
        <div className={styles.modal__inner}>
          {activeItem?.date_add && (
            <Text
              className={styles.timeStamp}
              variant="body14"
              fontWeight="regular"
            >
              {new Date(activeItem.date_add).toLocaleDateString(i18n.language, {
                day: 'numeric',
                month: 'long',
              })}
            </Text>
          )}
          <Text className={styles.title}>{activeItem?.title}</Text>
          {activeItem?.body && (
            <div
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(activeItem.body, {
                  allowedTags: allowedTagsSanitizer,
                  allowedAttributes: allowedAttributesSchema,
                  allowedIframeHostnames: allowedIframeHostnamesSchema,
                }),
              }}
            />
          )}
        </div>
      </Modal>
      <Announcements
        showFilter
        onClick={(el) => {
          setActiveItem(el);
        }}
      />
    </PageSkeleton>
  );
};
