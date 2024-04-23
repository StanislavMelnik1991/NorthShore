/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/no-unescaped-entities */
import classNames from 'classnames';
import { IconLogo } from '@shared/icons';
import { Text, Title } from '@shared/ui';
import styles from './Footer.module.scss';

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <footer className={classNames(styles.wrapper, className)}>
      <IconLogo theme="light" height={30} />
      <Title variant="h4" fontWeight="normal">
        ООО "Управляющая компания Северный Берег"
      </Title>
      <div className={styles.contacts}>
        <a href={'tel:+375173116888'}>
          <Text>+375 17 3116888</Text>
        </a>
        <a href={'https://northwaterfront.by/'}>
          <Text>northwaterfront.by</Text>
        </a>
      </div>
    </footer>
  );
};
