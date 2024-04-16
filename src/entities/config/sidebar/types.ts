import { SVGProps } from "react";
import { ThemeIcons } from "@shared/icons/types";

export type NavItemProps = {
  title: string;
  href: string;
  acceptedGroups?: Array<number>;
  icon: React.MemoExoticComponent<
    React.ForwardRefExoticComponent<
      Omit<
        SVGProps<SVGSVGElement> & {
          theme?: ThemeIcons;
        },
        "ref"
      > &
        React.RefAttributes<SVGSVGElement>
    >
  >;
  breadcrumbs?: Array<{
    title?: string;
    href: string;
  }>;
};
