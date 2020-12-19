import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import pixabayAPI from './services/pixabay-api';

import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function App() {
  const [serchQuery, setSerchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [openedImg, setOpenedImg] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (serchQuery !== '' && status === 'idle') {
      setStatus('pending');
      makeFetch();
    }

    if (images.length === 0 && status === 'resolved') {
      toast.info(`По запросу '${serchQuery}' ничего не найдено`);
    }
  }, [images.length, status, serchQuery]);

  const handleFormSubmit = serchQuery => {
    setSerchQuery(serchQuery);
    setStatus('idle');
    setImages([]);
    setCurrentPage(1);
    setTotalImages(0);
  };

  const handleBtnClick = () => {
    setStatus('pending');
    makeFetch();
  };

  const handleImgClick = e => {
    const largeImg = e.currentTarget.alt;

    setShowModal(showModal => !showModal);
    setOpenedImg(largeImg);
  };

  const handleOverleyClick = e => {
    if (e.target.nodeName !== 'IMG') {
      setShowModal(showModal => !showModal);
    }
  };

  const makeFetch = () => {
    pixabayAPI
      .fetchImages(serchQuery, currentPage)
      .then(parsedResponse => {
        setImages([...images, ...parsedResponse.hits]);
        setCurrentPage(currentPage + 1);
        setTotalImages(parsedResponse.total);
      })
      .then(() => {
        setStatus('resolved');
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  return (
    <div className={s.App}>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onClick={handleImgClick} />

      {status === 'pending' && (
        <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
      )}

      {images.length > 0 && images.length < totalImages && (
        <Button onClick={handleBtnClick} />
      )}

      {status === 'rejected' && <div>{error}</div>}

      {showModal && <Modal largeImg={openedImg} onClick={handleOverleyClick} />}
    </div>
  );
}
