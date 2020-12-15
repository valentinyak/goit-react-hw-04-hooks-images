import React, { Component } from 'react';
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

export default class App extends Component {
  state = {
    serchQuery: '',
    currentPage: 1,
    images: [],
    error: null,
    status: 'idle',
    showModal: false,
    openedImg: null,
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchQuery, images, status } = this.state;

    if (serchQuery !== prevState.serchQuery) {
      this.setState({ currentPage: 1, images: [], status: 'pending' });
      setTimeout(() => {
        this.makeFetch();
      });
    }

    if (images.length === 0 && status === 'resolved') {
      toast.info('По вашему запросу ничего не найдено');
      this.setState({ status: 'idle' });
    }
  }

  handleFormSubmit = serchQuery => {
    this.setState({ serchQuery });
  };

  handleBtnClick = () => {
    this.setState({ status: 'pending' });
    this.makeFetch();

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleImgClick = e => {
    const largeImg = e.currentTarget.alt;

    this.setState(state => {
      return { showModal: !state.showModal, openedImg: largeImg };
    });
  };

  handleOverleyClick = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    this.setState(state => {
      return { showModal: !state.showModal };
    });
  };

  makeFetch() {
    pixabayAPI
      .fetchImages(this.state.serchQuery, this.state.currentPage)
      .then(parsedResponse => {
        this.setState(state => {
          return {
            images: [...state.images, ...parsedResponse.hits],
            currentPage: state.currentPage + 1,
            status: 'resolved',
            totalImages: parsedResponse.total,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  render() {
    const {
      handleFormSubmit,
      state,
      handleImgClick,
      handleBtnClick,
      handleOverleyClick,
    } = this;
    const { images, status, totalImages, error, showModal, openedImg } = state;

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

        {showModal && (
          <Modal largeImg={openedImg} onClick={handleOverleyClick} />
        )}
      </div>
    );
  }
}
