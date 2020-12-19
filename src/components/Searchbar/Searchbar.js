import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [serchQuery, setSerchQuery] = useState('');

  const handleSearchQueryChange = e => {
    setSerchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (serchQuery.trim() === '') {
      toast.error('Вы не ввели поисковой запрос');
      return;
    }

    onSubmit(serchQuery);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s['SearchForm-button']}>
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={serchQuery}
          onChange={handleSearchQueryChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
