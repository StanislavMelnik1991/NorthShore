import { SVGProps, Ref, forwardRef, memo } from 'react';
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <rect width={24} height={24} rx={12} fill="#1B9E7F" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8837 7.46091C18.0786 7.65651 18.078 7.97309 17.8824 8.16801L9.48065 16.5405C9.28529 16.7352 8.96918 16.7349 8.77416 16.5399L5.63448 13.4002C5.43922 13.2049 5.43922 12.8883 5.63448 12.6931C5.82975 12.4978 6.14633 12.4978 6.34159 12.6931L9.12833 15.4798L17.1765 7.45967C17.3721 7.26475 17.6887 7.2653 17.8837 7.46091Z"
      fill="white"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as IconDone };
