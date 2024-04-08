import classNames from "classnames";
import { toast } from "react-toastify";
import styles from "./IconsGrid.module.scss";
import {
  IconArrow,
  IconBriefcase,
  IconDot,
  IconHome,
  IconLogo,
  IconLoupe,
  IconStaple,
  IconPlus,
  IconHuman,
  IconEyeClose,
  IconEyeOpen,
} from ".";

interface Props {
  size: number;
}

export const IconsGrid = ({ size }: Props) => {
  return (
    <div className={classNames(styles.wrapper)}>
      <Item name="IconArrow">
        <IconArrow width={size} height={size} />
      </Item>
      <Item name="IconBriefcase">
        <IconBriefcase width={size} height={size} />
      </Item>
      <Item name="IconDot">
        <IconDot width={size} height={size} />
      </Item>
      <Item name="IconHome">
        <IconHome width={size} height={size} />
      </Item>
      <Item name="IconLogo">
        <IconLogo height={size} />
      </Item>
      <Item name="IconLoupe">
        <IconLoupe width={size} height={size} />
      </Item>
      <Item name="IconStaple">
        <IconStaple width={size} height={size} />
      </Item>
      <Item name="IconPlus">
        <IconPlus width={size} height={size} />
      </Item>
      <Item name="IconHuman">
        <IconHuman width={size} height={size} />
      </Item>
      <Item name="IconEyeOpen">
        <IconEyeOpen width={size} height={size} />
      </Item>
      <Item name="IconEyeClose">
        <IconEyeClose width={size} height={size} />
      </Item>
    </div>
  );
};

interface ItemProps {
  name: string;
  children: JSX.Element;
}

const Item = ({ children, name }: ItemProps) => {
  return (
    <div
      className={styles.item}
      onClick={() => {
        navigator.clipboard.writeText(name);
        toast.info(`"${name}" copied to clipboard`);
      }}
      title={"Copy icon name"}
    >
      {children}
      {name}
    </div>
  );
};
