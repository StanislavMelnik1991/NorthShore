import classNames from 'classnames';
import { ReactNode } from 'react';
import { IconClose } from '@shared/icons';
import { Card } from '@shared/ui';
import { useModal } from '../hook';
import { Portal } from '../Portal';
import styles from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}: ModalProps) => {
  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(
          styles.wrapper,
          {
            [styles.opened]: isOpen,
            [styles.isClosing]: isClosing,
          },
          className,
        )}
      >
        <div className={styles.shadow} onClick={close} />
        <div className={styles.content}>
          <Card className={styles.card}>
            <IconClose
              width={20}
              height={20}
              className={styles.close}
              onClick={close}
            />
            {children}
          </Card>
        </div>
      </div>
    </Portal>
  );
};
