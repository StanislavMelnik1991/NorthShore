import classNames from "classnames";
import styles from "./NewsPage.module.scss";

interface Props {
  className?: string;
}

const NewsPage = ({ className }: Props) => {
  return <div className={classNames(styles.wrapper, className)}>news</div>;
};

export default NewsPage;
