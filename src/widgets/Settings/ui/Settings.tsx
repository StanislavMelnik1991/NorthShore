import { LangSelection } from '@entities/components/langSection';
import { ISetting } from '@entities/types';
import { LanguageEnum } from '@shared/constants';
import { IconBasket } from '@shared/icons';
import { Text, Button, TextField, Loader } from '@shared/ui';
import { useSettings } from '../hook';
import styles from './Settings.module.scss';

interface Props {
  config: Array<ISetting>;
  userName: string | undefined;
}
export const Settings = ({ config, userName }: Props) => {
  const { t, lang, handleChangeLang, isLoading } = useSettings();

  return (
    <div className={styles.wrapper}>
      {isLoading && (
        <div className={styles.loader}>
          <Loader size={80} />
        </div>
      )}
      {config.map((el) => {
        return (
          <div key={el.title} className={styles.block__wrapper}>
            <Text className={styles.block__title}>{el.title}</Text>
            {el.fields.map((elem) => {
              return elem.isAvatar ? (
                <div
                  className={styles.photo_block}
                  key={el.title + '-' + elem.name}
                >
                  {elem.value ? (
                    <div
                      className={styles.photo}
                      style={{ background: 'url(' + elem.value + ')' }}
                    ></div>
                  ) : (
                    <div className={styles.photo__circle}>
                      {userName ? userName[0] : ''}
                    </div>
                  )}
                  <div className={styles.photo_block__info}>
                    <Text className={styles.field__title}>{elem.name}</Text>
                    <div className={styles.photo_block__info__btns}>
                      {elem.editable && (
                        <Button variant="light">{t('blocks.btns.edit')}</Button>
                      )}
                      {elem.deletable && (
                        <Button variant="danger">
                          {elem.deleteControl === 'small' ? (
                            <IconBasket className={styles.basket} />
                          ) : (
                            t('blocks.btns.delete')
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : elem.isPassword ? (
                <div
                  className={styles.descr_block}
                  key={el.title + '-' + elem.name}
                >
                  <div className={styles.descr_block__info}>
                    <Text className={styles.field__title}>{elem.name}</Text>
                    <TextField
                      wrapperClassName={styles.password}
                      type="password"
                      value={elem.value ? elem.value : '12345678'}
                      readOnly
                    />
                  </div>
                  <div className={styles.block__btns}>
                    {elem.editable && (
                      <Button variant="light">{t('blocks.btns.edit')}</Button>
                    )}
                    {elem.deletable && (
                      <Button variant="danger">
                        {elem.deleteControl === 'small' ? (
                          <IconBasket className={styles.basket} />
                        ) : (
                          t('blocks.btns.delete')
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ) : elem.value ? (
                <div className={styles.block} key={el.title + '-' + elem.name}>
                  <div className={styles.block__info}>
                    <Text className={styles.field__title}>{elem.name}</Text>
                    <Text variant="body16" className={styles.text}>
                      {elem.value}
                    </Text>
                  </div>
                  <div className={styles.block__btns}>
                    {elem.editable && (
                      <Button variant="light">{t('blocks.btns.edit')}</Button>
                    )}
                    {elem.deletable && (
                      <Button variant="danger">
                        {elem.deleteControl === 'small' ? (
                          <IconBasket className={styles.basket} />
                        ) : (
                          t('blocks.btns.delete')
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={styles.descr_block}
                  key={el.title + '-' + elem.name}
                >
                  <div className={styles.descr_block__info}>
                    <Text className={styles.field__title}>{elem.name}</Text>
                    <Text variant="body16" className={styles.text}>
                      {elem.description}
                    </Text>
                  </div>
                  <div className={styles.block__btns}>
                    {elem.editable && (
                      <Button variant="light">{t('blocks.btns.edit')}</Button>
                    )}
                    {elem.deletable && (
                      <Button variant="danger">
                        {elem.deleteControl === 'small' ? (
                          <IconBasket className={styles.basket} />
                        ) : (
                          t('blocks.btns.delete')
                        )}
                      </Button>
                    )}
                    {elem.values && (
                      <LangSelection
                        onChange={(val) =>
                          handleChangeLang(val.value as LanguageEnum)
                        }
                        options={elem.values}
                        value={
                          lang === 'en'
                            ? { value: 'en', label: 'English' }
                            : { value: 'ru', label: 'Русский' }
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
