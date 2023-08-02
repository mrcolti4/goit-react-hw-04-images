import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { Component } from 'react';

import style from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEscClick);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscClick);
    document.body.style.overflow = 'auto';
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseBtnClick = () => {
    this.props.onClose();
  };

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props.data;
    return (
      <div onClick={this.onOverlayClick} className={style.overlay}>
        <div className={style.modal}>
          <img src={largeImageURL} alt="" />
          <button
            onClick={this.onCloseBtnClick}
            type="button"
            className={style.modal__close}
          >
            <MdClose fontSize={'32px'} />
          </button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  data: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
