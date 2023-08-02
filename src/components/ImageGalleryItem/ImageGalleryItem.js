import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webformatURL, onOpenModal }) => {
  return (
    <li onClick={onOpenModal} data-id={id} className={style.gallery__item}>
      <img className={style.gallery__item_image} src={webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
