import { Cover } from '@entities/components';
import { IconStaple } from '@shared/icons';
import { Button } from '@shared/ui';
import { useEditor } from '../hook';

interface Props {
  className?: string;
  image?: string;
  onDrop: (files: File[]) => Promise<void>;
  onRemove: () => void;
  loading?: boolean;
}

export const AdditionalImagesEditor = ({
  className,
  image,
  onDrop,
  loading,
  onRemove,
}: Props) => {
  const { getInputProps, open, t } = useEditor({
    onDrop,
  });
  return (
    <div className={className}>
      <input {...getInputProps()} />
      {!image ? (
        <Button
          variant={'light'}
          type="button"
          onClick={open}
          loading={loading}
        >
          <IconStaple width={24} height={24} />
          {t('editor.cover.label')}
        </Button>
      ) : (
        <Cover src={image} onRemove={onRemove} />
      )}
    </div>
  );
};
