import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import avatar from '../img/avatar.png';
import whiteLogo from '../img/white-logo.png';
import style from './Header.module.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      profileName: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.newUser();
  }

  newUser = async () => {
    const data = await getUser();
    this.setState({ profileName: data.name, isLoading: false });
  }

  render() {
    const { profileName, isLoading } = this.state;
    const { nav } = this.props;
    return (
      <header className={ style.header } data-testid="header-component">
        <div className={ style.row }>
          <img src={ whiteLogo } alt="trybe tunes" />
          <div className={ style.user }>
            <img src={ avatar } alt="avatar" />
            { isLoading
              ? <Loading />
              : <h2 data-testid="header-user-name">{ profileName }</h2>}
          </div>
        </div>
        <nav>
          <Link
            className={ nav === 'search' ? style.green : 'white' }
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisa
          </Link>
          <Link
            className={ nav === 'favorites' ? style.green : 'white' }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </Link>
          <Link
            className={ nav === 'profile' ? style.green : 'white' }
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  nav: PropTypes.string.isRequired,
};

export default Header;
