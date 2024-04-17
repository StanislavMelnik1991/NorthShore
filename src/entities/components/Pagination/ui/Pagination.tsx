import classNames from 'classnames';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface Props {
  className?: string;
  total: number;
  onChange(selectedItem: { selected: number }): void;
}

export const Pagination = ({ className, onChange, total }: Props) => {
  return (
    <ReactPaginate
      containerClassName={classNames(styles.wrapper, className)}
      pageClassName={styles.element}
      pageLinkClassName={styles.link}
      breakClassName={styles.element}
      breakLinkClassName={styles.link}
      previousClassName={styles.element}
      previousLinkClassName={classNames(styles.link, styles.icon)}
      nextClassName={styles.element}
      nextLinkClassName={classNames(styles.link, styles.icon)}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
      breakLabel="..."
      nextLabel="→"
      onPageChange={onChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={total}
      previousLabel="←"
      renderOnZeroPageCount={null}
    />
  );
};
