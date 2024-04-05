import { SVGProps } from "react";

export type NavItemProps = {
  title: string;
  href: string;
  icon: React.MemoExoticComponent<
    React.ForwardRefExoticComponent<
      Omit<
        SVGProps<SVGSVGElement> & {
          isInvertColors?: boolean;
        },
        "ref"
      > &
        React.RefAttributes<SVGSVGElement>
    >
  >;
  breadcrumbs?: Array<{
    title: string;
    href: string;
  }>;
};
