import { SVGProps } from 'react';
import { AppRoutesEnum } from '@shared/constants';
import { ThemeIcons } from '@shared/icons/types';

export type NavItemProps = {
  title: string;
  href?: string;
  name?: AppRoutesEnum;
  isLink?: boolean;
  authOnly?: boolean;
  onClick?: () => void;
  acceptedGroups?: Array<number>;
  icon: React.MemoExoticComponent<
    React.ForwardRefExoticComponent<
      Omit<
        SVGProps<SVGSVGElement> & {
          theme?: ThemeIcons;
        },
        'ref'
      > &
        React.RefAttributes<SVGSVGElement>
    >
  >;
  breadcrumbs?: Array<{
    title?: string;
    href: string;
  }>;
};
