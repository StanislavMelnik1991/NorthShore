import classNames from "classnames";
import styles from "./MainPage.module.scss";

interface Props {
  className?: string;
}

const MainPage = ({ className }: Props) => {
  return <div className={classNames(styles.wrapper, className)}>main</div>;
};

export default MainPage;
