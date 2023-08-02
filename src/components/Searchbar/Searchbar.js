import PropTypes from 'prop-types';

import { Component } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import style from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onInputChange = ({ target: { value: query } }) => {
    this.setState({ query });
  };

  onBtnClick = e => {
    const { query } = this.state;

    e.preventDefault();

    if (query.trim() === '') return alert("You can't submit empty string");
    this.props.handleImageQuery(query);
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.searchform}>
          <button
            onClick={this.onBtnClick}
            type="submit"
            className={style.searchform__button}
          >
            <BiSearchAlt fontSize={'32px'} />
            <span className={style.searchform__button_label}>Search</span>
          </button>

          <input
            onChange={this.onInputChange}
            value={this.state.query}
            className={style.searchform__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleImageQuery: PropTypes.func.isRequired,
};
