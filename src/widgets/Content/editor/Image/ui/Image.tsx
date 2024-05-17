import classNames from 'classnames';
import { Cover } from '@entities/components';
import { IFile } from '@entities/types';
import { IconStaple } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import { useImageEditor } from '../hook';
import styles from './Image.module.scss';

interface Props {
  className?: string;
  image?: IFile;
  setImage: (file?: IFile) => void;
  label?: string;
  aspectRatio?: string | number;
}

export const ContentImageEditor = ({
  className,
  setImage,
  image,
  label,
  aspectRatio,
}: Props) => {
  const { getInputProps, loading, open, t } = useImageEditor({
    setImage,
  });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <input {...getInputProps()} />
      {label && (
        <Text className={styles.label} variant="body14" fontWeight="regular">
          {label}
        </Text>
      )}
      {!image ? (
        <Button
          variant={'light'}
          className={styles.downloadButton}
          type="button"
          onClick={open}
          loading={loading}
        >
          <IconStaple width={24} height={24} />
          {t('controls.upload')}
        </Button>
      ) : (
        <Cover
          aspectRatio={aspectRatio}
          src={image.url}
          onRemove={() => setImage(undefined)}
        />
      )}
    </div>
  );
};
