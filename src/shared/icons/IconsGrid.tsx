import classNames from 'classnames';
import { toast } from 'react-toastify';
import styles from './IconsGrid.module.scss';
import { ThemeIcons } from './types';
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
  IconDottedLine,
  IconClose,
  IconBurger,
  IconCalendar,
  IconClock,
  IconChain,
  IconPencil,
  IconDrawer,
  IconNewspaper,
  IconMask,
  IconLoudspeaker,
  IconWrench,
  IconDocumentHolder,
  IconCalendarX,
  IconQuestion,
  IconGear,
  IconTable,
  IconDiagram,
  IconLock,
  IconPassport,
  IconPeople,
  IconClockPast,
  IconDone,
  IconStar,
} from '.';

interface Props {
  size: number;
  theme: ThemeIcons;
}

export const IconsGrid = ({ size, theme }: Props) => {
  return (
    <div className={classNames(styles.wrapper)}>
      <Item name="IconArrow">
        <IconArrow width={size} height={size} />
      </Item>
      <Item name="IconBriefcase">
        <IconBriefcase theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconDot">
        <IconDot width={size} height={size} />
      </Item>
      <Item name="IconHome">
        <IconHome theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconLogo">
        <IconLogo theme={theme} height={size} />
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
        <IconHuman theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconEyeOpen">
        <IconEyeOpen width={size} height={size} />
      </Item>
      <Item name="IconEyeClose">
        <IconEyeClose width={size} height={size} />
      </Item>
      <Item name="IconDottedLine">
        <IconDottedLine width={size} height={size} />
      </Item>
      <Item name="IconClose">
        <IconClose width={size} height={size} />
      </Item>
      <Item name="IconBurger">
        <IconBurger width={size} height={size} />
      </Item>
      <Item name="IconCalendar">
        <IconCalendar width={size} height={size} />
      </Item>
      <Item name="IconClock">
        <IconClock width={size} height={size} />
      </Item>
      <Item name="IconChain">
        <IconChain width={size} height={size} />
      </Item>
      <Item name="IconPencil">
        <IconPencil width={size} height={size} />
      </Item>
      <Item name="IconDrawer">
        <IconDrawer width={size} height={size} />
      </Item>
      <Item name="IconNewspaper">
        <IconNewspaper theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconMask">
        <IconMask theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconLoudspeaker">
        <IconLoudspeaker theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconWrench">
        <IconWrench theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconDocumentHolder">
        <IconDocumentHolder theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconCalendarX">
        <IconCalendarX theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconQuestion">
        <IconQuestion theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconGear">
        <IconGear theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconTable">
        <IconTable theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconDiagram">
        <IconDiagram theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconLock">
        <IconLock theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconLock">
        <IconPassport theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconPeople">
        <IconPeople theme={theme} width={size} height={size} />
      </Item>
      <Item name="IconClockPast">
        <IconClockPast width={size} height={size} />
      </Item>
      <Item name="IconDone">
        <IconDone width={size} height={size} />
      </Item>
      <Item name="IconStar">
        <IconStar width={size} height={size} />
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
      title={'Copy icon name'}
    >
      {children}
      {name}
    </div>
  );
};
