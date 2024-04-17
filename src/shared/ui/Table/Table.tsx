import classNames from 'classnames';
import styles from './Table.module.scss';

interface Props {
  className?: string;
  config: Array<ConfigItemType>;
  items: Array<Record<string, JSX.Element>>;
}

export type ConfigItemType = {
  label?: JSX.Element;
  colClassName?: string;
  width?: number | string;
  name: string;
};

export const Table = ({ className, config, items }: Props) => {
  return (
    <table className={classNames(styles.wrapper, className)}>
      <thead>
        <tr>
          {config.map(({ label, colClassName, width }, index) => {
            return (
              <th
                className={classNames(colClassName)}
                style={{ width }}
                key={`table-head-item-${index}`}
              >
                {label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((el, index) => {
          return (
            <tr key={`table-row-${index}`}>
              {config.map(({ name, colClassName, width }, index) => {
                return (
                  <th
                    className={classNames(colClassName)}
                    style={{ width }}
                    key={`table-column-item-${index}`}
                  >
                    {el[name]}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
