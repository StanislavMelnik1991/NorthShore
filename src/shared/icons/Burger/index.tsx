import classNames from 'classnames';
import { SVGProps, Ref, forwardRef, memo, useState } from 'react';
import styles from './Icon.module.scss';

type ExtendedProps = SVGProps<SVGSVGElement> & { isMenuOpen?: boolean };

const SvgComponent = (
  { isMenuOpen, className, ...props }: ExtendedProps,
  ref: Ref<SVGSVGElement>,
) => {
  const [secondLineX, setSecondLineX] = useState(4);
  const onMouseEnterHandler = () => {
    setSecondLineX(0);
  };
  const onMouseLeaveHandler = () => {
    setSecondLineX(4);
  };

  return (
    <svg
      className={classNames(styles.wrapper, className)}
      width={isMenuOpen ? 18 : 22}
      height={isMenuOpen ? 18 : 14}
      viewBox={isMenuOpen ? '0 0 18 18' : '0 0 22 14'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      {...props}
    >
      <rect
        width={22}
        height={2}
        x={isMenuOpen ? 2 : 0}
        y={isMenuOpen ? 0.5 : 0}
        rx={1}
        transform={`rotate(${isMenuOpen ? '45 2 0.5' : 0})`}
        fill="black"
      />
      <rect
        y={isMenuOpen ? 16 : 12}
        width={22}
        height={2}
        x={isMenuOpen ? 0.5 : 1}
        transform={`rotate(${isMenuOpen ? '-45 0.5 16' : 0})`}
        rx={1}
        fill="black"
      />
      <rect
        className={classNames({ [styles.hideAnimation]: isMenuOpen })}
        x={secondLineX}
        y={6}
        width={isMenuOpen ? 0 : 18}
        height={2}
        rx={1}
        fill="black"
      />
    </svg>
  );
};
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as IconBurger };
