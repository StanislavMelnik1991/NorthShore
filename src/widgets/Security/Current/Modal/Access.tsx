import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { CurrentSkeleton, Modal, Tab } from '@entities/components';
import { SecurityAccess } from '@entities/types';
import { Text, Title } from '@shared/ui';
import { MainInformation, ConfigInformation, AccessInformation } from '../';
import styles from './Modal.module.scss';

interface Props {
  className?: string;
  accessPoint?: SecurityAccess;
  onClose: () => void;
}

export const AccessModal = ({ className, accessPoint, onClose }: Props) => {
  const { t } = useTranslation('security');
  const labels = [
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-1`}
    >
      {t('details.tabs.main')}
    </Text>,
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-2`}
    >
      {t('details.tabs.config')}
    </Text>,
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-3`}
    >
      {`${t('details.tabs.addressAccess')} (${accessPoint?.entrances.length})`}
    </Text>,
  ];
  return (
    <Modal isOpen={!!accessPoint} onClose={onClose}>
      {accessPoint && (
        <CurrentSkeleton
          className={classNames(styles.wrapper, className)}
          hideShadow
        >
          <Title
            variant="h2"
            fontWeight="bold"
          >{`${accessPoint.type.name} № ${accessPoint?.id}`}</Title>
          <Tab
            labels={labels}
            tabs={[
              <MainInformation
                key={`main_camera_information-${accessPoint?.id}`}
                data={accessPoint}
              />,
              <ConfigInformation
                key={`main_camera_information-${accessPoint?.id}`}
                data={accessPoint}
              />,
              <AccessInformation
                key={`main_camera_information-${accessPoint?.id}`}
                data={accessPoint}
              />,
            ]}
          />
        </CurrentSkeleton>
      )}
    </Modal>
  );
};
