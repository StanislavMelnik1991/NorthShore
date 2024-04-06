import { SVGProps, Ref, forwardRef, memo } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M11.9688 22.5C17.4916 22.5 21.9688 18.0228 21.9688 12.5C21.9688 6.97715 17.4916 2.5 11.9688 2.5C6.4459 2.5 1.96875 6.97715 1.96875 12.5C1.96875 18.0228 6.4459 22.5 11.9688 22.5Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.21094 15.5C8.26094 17.01 10.0209 18 12.0009 18C13.9809 18 15.7309 17.01 16.7909 15.5"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.3281 9.22656C9.10338 8.51946 7.52892 8.94133 6.81215 10.1687"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5156 10.1641C16.8085 8.93932 15.2341 8.51744 13.9997 9.22196"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as EmojiIcon };
