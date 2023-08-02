import PropTypes from 'prop-types';
import clsx from 'clsx';

import style from './Button.module.css';

export const Button = ({ handleLoadMore, dataLength }) => {
  let classes = '';
  if (dataLength === 0 || dataLength < 12) {
    classes += style.hidden;
  }
  return (
    <button
      className={clsx(style.loadmore, classes)}
      type="button"
      onClick={handleLoadMore}
    >
      Load more
    </button>
  );
};
Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
};
