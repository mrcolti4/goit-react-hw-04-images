import PropTypes from 'prop-types';

import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import style from './Searchbar.module.css';

export const Searchbar = ({ requestQuery, handleImageQuery }) => {
  const [query, setQuery] = useState('');

  const onInputChange = ({ target: { value: query } }) => {
    setQuery(query);
  };

  const onBtnClick = e => {
    e.preventDefault();

    if (query.trim() === '') return alert("You can't submit empty string");
    if (requestQuery === query.trim()) return;
    handleImageQuery(query);
  };

  return (
    <header className={style.searchbar}>
      <form className={style.searchform}>
        <button
          onClick={onBtnClick}
          type="submit"
          className={style.searchform__button}
        >
          <BiSearchAlt fontSize={'32px'} />
          <span className={style.searchform__button_label}>Search</span>
        </button>

        <input
          onChange={onInputChange}
          value={query}
          className={style.searchform__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleImageQuery: PropTypes.func.isRequired,
};
