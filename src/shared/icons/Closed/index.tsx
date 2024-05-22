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
    <rect width={24} height={24} rx={12} fill="#878175" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8839 7.45956C18.0788 7.65517 18.0783 7.97175 17.8827 8.16667L9.48089 16.5391C9.28553 16.7338 8.96942 16.7335 8.7744 16.5385L5.63473 13.3988C5.43947 13.2036 5.43947 12.887 5.63473 12.6917C5.82999 12.4965 6.14657 12.4965 6.34183 12.6917L9.12857 15.4785L17.1768 7.45833C17.3724 7.26341 17.689 7.26396 17.8839 7.45956Z"
      fill="#FDFCFB"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as IconClosed };
