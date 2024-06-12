import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { CurrentSkeleton, Modal, Tab } from '@entities/components';
import { SecuritySlsIntercom } from '@entities/types';
import { Text, Title } from '@shared/ui';
import { MainInformation } from '../';
import styles from './Modal.module.scss';

interface Props {
  className?: string;
  data?: SecuritySlsIntercom;
  onClose: () => void;
}

export const SlsModal = ({ className, data, onClose }: Props) => {
  const { t } = useTranslation('security');
  const labels = [
    <Text
      variant="body16"
      fontWeight="medium"
      key={`camera_details-tab-label-1`}
    >
      {t('details.tabs.main')}
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
          >{`${t('modules.sslIntercomSingle')} №${data.id}`}</Title>
          <Tab
            labels={labels}
            tabs={[
              <MainInformation
                key={`main_camera_information-${data.id}`}
                data={{
                  ...data,
                  name: undefined,
                  apartment: data.apartment,
                  entrance: data.apartment.entrance,
                  building: data.apartment.entrance.building,
                  street: data.apartment.entrance.building.street,
                }}
              />,
            ]}
          />
        </CurrentSkeleton>
      )}
    </Modal>
  );
};
