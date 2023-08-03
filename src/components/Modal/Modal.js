import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { useEffect } from 'react';

import style from './Modal.module.css';

export const Modal = props => {
  const {
    data: { largeImageURL },
    onClose,
  } = props;

  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onEscClick);

    return () => {
      document.removeEventListener('keydown', onEscClick);
    };
  }, [onClose]);

  const onCloseBtnClick = () => {
    onClose();
  };

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div onClick={onOverlayClick} className={style.overlay}>
      <div className={style.modal}>
        <img src={largeImageURL} alt="" />
        <button
          onClick={onCloseBtnClick}
          type="button"
          className={style.modal__close}
        >
          <MdClose fontSize={'32px'} />
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  data: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
