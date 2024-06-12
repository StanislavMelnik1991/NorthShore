import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IUser } from '@entities/types';
import styles from './MainInfo.module.scss';

interface Props {
  className?: string;
  data?: IUser;
}

export const ResidentMainInfo = ({ className, data }: Props) => {
  const { t } = useTranslation('residents');

  const accounts = (
    <th className={styles.raw_text}>
      {data &&
        data.account_numbers &&
        data.account_numbers.map((elem, i) => (
          <div key={'acc' + i}>{elem.account}</div>
        ))}
    </th>
  );

  const apartments = (
    <th className={styles.raw_text}>
      {data &&
        data.account_numbers &&
        data.account_numbers.map((elem, i) => (
          <div
            key={'i' + i}
          >{`${elem.apartment.entrance.building.street.name.trim()}, ${elem.apartment.entrance.building.name}, ${elem.apartment.name}`}</div>
        ))}
    </th>
  );

  return (
    <table className={classNames(styles.wrapper, className)}>
      <tbody>
        <tr>
          <th className={styles.raw_title}>{t('info_fields.name')}</th>
          <th className={styles.raw_text}>{data?.name}</th>
        </tr>
        <tr>
          <th className={styles.raw_title}>{t('info_fields.phone_number')}</th>
          <th className={styles.raw_text}>{data?.phone_number}</th>
        </tr>
        <tr>
          <th className={styles.raw_title}>{t('info_fields.account')}</th>
          {accounts}
        </tr>
        <tr>
          <th className={styles.raw_title}>{t('info_fields.objects')}</th>
          {apartments}
        </tr>
        <tr>
          <th className={styles.raw_title}>{t('info_fields.lang')}</th>
          <th className={styles.raw_text}>
            {data?.lang === 'en' ? t('langs.en') : t('langs.ru')}
          </th>
        </tr>
        <tr>
          <th className={styles.raw_title}>{t('info_fields.mail')}</th>
          <th className={styles.raw_text}>{data?.email}</th>
        </tr>
        {/* <tr>
          <th className={styles.raw_title}>
            {t('info_fields.password')}
          </th>
          <th className={styles.raw_text}>
            <Button variant="text" className={styles.password}>
              {t('info_fields.reset')}
            </Button>
          </th>
        </tr> */}
      </tbody>
    </table>
  );
};
