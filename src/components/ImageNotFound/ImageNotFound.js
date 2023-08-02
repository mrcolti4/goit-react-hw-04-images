import PropTypes from 'prop-types';
import style from './ImageNotFound.module.css';

export const ImageNotFound = ({ query, dataLength, isLoading }) => {
  if (dataLength === 0 && !isLoading && query.trim() !== '') {
    return <h2 className={style.imagenotfound__header}>Images not found</h2>;
  }
};

ImageNotFound.propTypes = {
  query: PropTypes.string.isRequired,
  dataLength: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
