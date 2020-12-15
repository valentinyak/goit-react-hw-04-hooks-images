import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ largeImg, onClick }) {
  return (
    <div className={s.Overlay} onClick={onClick}>
      <div className={s.Modal}>
        <img src={largeImg} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImg: PropTypes.string,
  onClick: PropTypes.func,
};
