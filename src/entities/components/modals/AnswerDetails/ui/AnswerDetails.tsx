import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Text, Title } from '@shared/ui';
import styles from './AnswerDetails.module.scss';
import { AnswerDetailsUser } from './User/User';

interface Props {
  className?: string;
  answerText: string;
  users: Array<{
    id: number | string;
    name: string;
    avatar?: string;
    group: { name: string };
  }>;
}

export const AnswerDetails = ({ className, answerText, users }: Props) => {
  const { t } = useTranslation('voting');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Title variant="h2" fontWeight="bold" className={styles.title}>
        {t('routes.answerDetails')}
      </Title>
      <div>
        <Text variant="body16" fontWeight="regular">
          {t('editor.answer.label')}
        </Text>
        {': '}
        <Text variant="body16" fontWeight="medium">
          {`${answerText} (${users.length})`}
        </Text>
      </div>
      <div className={styles.users}>
        {users.map((el) => {
          return <AnswerDetailsUser key={`user-id-link-${el.id}`} user={el} />;
        })}
      </div>
    </div>
  );
};
