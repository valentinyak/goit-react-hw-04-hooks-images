import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images, onClick }) {
  return images.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <li className={s.ImageGalleryItem} key={id}>
        <img
          src={webformatURL}
          alt={largeImageURL}
          className={s['ImageGalleryItem-image']}
          onClick={onClick}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ).isRequired,
  onClick: PropTypes.func,
};
