import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { CurrentSkeleton, Modal, Tab } from '@entities/components';
import { SecurityIntercom } from '@entities/types';
import { Text, Title } from '@shared/ui';
import { MainInformation, ConfigInformation } from '../';
import styles from './Modal.module.scss';

interface Props {
  className?: string;
  data?: SecurityIntercom;
  onClose: () => void;
}

export const IntercomModal = ({ className, data, onClose }: Props) => {
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
  ];
  return (
    <Modal isOpen={!!data} onClose={onClose}>
      {data && (
        <CurrentSkeleton
          className={classNames(styles.wrapper, className)}
          hideShadow
        >
          <Title
            variant="h2"
            fontWeight="bold"
          >{`${data.type.name} № ${data?.id}`}</Title>
          <Tab
            labels={labels}
            tabs={[
              <MainInformation
                key={`main_camera_information-${data?.id}`}
                data={data}
              />,
              <ConfigInformation
                key={`main_camera_information-${data?.id}`}
                data={data}
              />,
            ]}
          />
        </CurrentSkeleton>
      )}
    </Modal>
  );
};
