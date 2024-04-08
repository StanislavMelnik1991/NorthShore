import { SVGProps, Ref, forwardRef, memo } from "react";
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
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.01992 4.26992C6.47333 2.81652 8.44457 2 10.5 2C12.5554 2 14.5267 2.81652 15.9801 4.26992C17.4335 5.72333 18.25 7.69457 18.25 9.75C18.25 10.7677 18.0495 11.7755 17.6601 12.7158C17.3988 13.3465 17.056 13.9385 16.6414 14.4772L21.7071 19.5429C22.0976 19.9334 22.0976 20.5666 21.7071 20.9571C21.3166 21.3476 20.6834 21.3476 20.2929 20.9571L15.2272 15.8914C14.6885 16.306 14.0965 16.6488 13.4658 16.9101C12.5255 17.2995 11.5177 17.5 10.5 17.5C9.48226 17.5 8.47448 17.2995 7.5342 16.9101C6.59393 16.5206 5.73958 15.9497 5.01992 15.2301C4.30027 14.5104 3.72941 13.6561 3.33993 12.7158C2.95046 11.7755 2.75 10.7677 2.75 9.75C2.75 7.69457 3.56652 5.72333 5.01992 4.26992ZM10.5 4C8.97501 4 7.51247 4.6058 6.43414 5.68414C5.3558 6.76247 4.75 8.22501 4.75 9.75C4.75 10.5051 4.89873 11.2528 5.18769 11.9504C5.47666 12.6481 5.9002 13.2819 6.43414 13.8159C6.96807 14.3498 7.60195 14.7733 8.29957 15.0623C8.99719 15.3513 9.7449 15.5 10.5 15.5C11.2551 15.5 12.0028 15.3513 12.7004 15.0623C13.3981 14.7733 14.0319 14.3498 14.5659 13.8159C15.0998 13.2819 15.5233 12.6481 15.8123 11.9504C16.1013 11.2528 16.25 10.5051 16.25 9.75C16.25 8.22501 15.6442 6.76247 14.5659 5.68414C13.4875 4.6058 12.025 4 10.5 4Z"
      fill="var(--dark-100)"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as IconLoupe };
