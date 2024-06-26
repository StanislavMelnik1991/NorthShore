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
  IconMap,
  IconBasket,
  IconCamera,
  IconPlusRounded,
  IconComment,
  IconPoint,
  IconFilter,
  IconWifi,
  IconInfo,
  IconKey,
  IconLightning,
  IconBattery,
  IconCheck,
  IconImage,
  IconShield,
  IconMail,
  IconPhone,
  IconTelegram,
  IconViber,
  IconShoppingBag,
  IconThermometer,
  IconMinus,
  IconLogoRu,
} from '.';

interface Props {
  size: number;
  theme: ThemeIcons;
}

export const IconsGrid = ({ size, theme }: Props) => {
  return (
    <div className={classNames(styles.wrapper)}>
      <Item name="IconViber">
        <IconViber width={size} height={size} />
      </Item>
      <Item name="IconTelegram">
        <IconTelegram width={size} height={size} />
      </Item>
      <Item name="IconPhone">
        <IconPhone width={size} height={size} />
      </Item>
      <Item name="IconMail">
        <IconMail width={size} height={size} />
      </Item>
      <Item name="IconImage">
        <IconImage width={size} height={size} />
      </Item>
      <Item name="IconCheck">
        <IconCheck width={size} height={size} />
      </Item>
      <Item name="IconBattery">
        <IconBattery width={size} height={size} />
      </Item>
      <Item name="IconLightning">
        <IconLightning width={size} height={size} />
      </Item>
      <Item name="IconKey">
        <IconKey width={size} height={size} />
      </Item>
      <Item name="IconInfo">
        <IconInfo width={size} height={size} />
      </Item>
      <Item name="IconWifi">
        <IconWifi width={size} height={size} />
      </Item>
      <Item name="IconFilter">
        <IconFilter width={size} height={size} />
      </Item>
      <Item name="IconComment">
        <IconComment width={size} height={size} />
      </Item>
      <Item name="IconPoint">
        <IconPoint width={size} height={size} />
      </Item>
      <Item name="IconCamera">
        <IconCamera width={size} height={size} />
      </Item>
      <Item name="IconBasket">
        <IconBasket width={size} height={size} />
      </Item>
      <Item name="IconArrow">
        <IconArrow width={size} height={size} />
      </Item>
      <Item name="IconMap">
        <IconMap width={size} height={size} />
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
      <Item name="IconLogoRu">
        <IconLogoRu height={size} />
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
      <Item name="IconMinus">
        <IconMinus width={size} height={size} />
      </Item>
      <Item name="IconPlusRounded">
        <IconPlusRounded width={size} height={size} />
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
      <Item name="IconShoppingBag">
        <IconShoppingBag theme={theme} width={size} height={size} />
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
      <Item name="IconShield">
        <IconShield width={size} height={size} />
      </Item>
      <Item name="IconThermometer">
        <IconThermometer height={size} />
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
