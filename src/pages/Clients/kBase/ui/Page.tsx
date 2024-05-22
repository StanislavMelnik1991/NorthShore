import classNames from 'classnames';
import { PageSkeleton } from '@entities/components';
import { IconLoupe } from '@shared/icons';
import { Text, TextField, Title } from '@shared/ui';
import image from '../assets/image.jpeg';
import questionImage from '../assets/questionImage.png';
import { useNewsListPage } from '../hook';
import styles from './Page.module.scss';
import Question from './Question';

export default () => {
  const {
    t,
    setSearch,
    setSelectedTheme,
    selectedTheme,
    themes,
    search,
    data,
    language,
  } = useNewsListPage();

  return (
    <PageSkeleton>
      <div className={styles.header}>
        <img src={image} className={styles.headerImage} />
        <img src={questionImage} className={styles.headerQuestionImage} />
        <div className={styles.headerContent}>
          <Title variant="h1" fontWeight="bold">
            {t('title')}
          </Title>
          <TextField
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            wrapperClassName={styles.input}
            placeholder={t('search')}
            leftItem={<IconLoupe width={20} height={20} />}
          />
        </div>
      </div>
      <div className={styles.filters}>
        {themes.map((el) => {
          return (
            <div
              key={`kbase-themes-${el.value}`}
              onClick={() => setSelectedTheme(el)}
              className={classNames(styles.filter, {
                [styles.active]: selectedTheme?.value === el.value,
              })}
            >
              <div className={styles.iconWrapper}>
                <img src={el.icon} className={styles.icon} />
              </div>
              <Text fontWeight="medium" variant="body14">
                {el.label}
              </Text>
            </div>
          );
        })}
      </div>
      <div className={styles.questions}>
        {data.map((el) => {
          return (
            <Question
              question={el.question[language] || ''}
              answer={el.answer[language] || ''}
              key={`kBase-question-${el.id}`}
            />
          );
        })}
      </div>
    </PageSkeleton>
  );
};
