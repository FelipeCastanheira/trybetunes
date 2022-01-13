import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import trybeTunes from '../img/trybe-tunes.png';

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
    return (
      <header data-testid="header-component">
        <div className="row">
          <img src={ trybeTunes } alt="trybe tunes" />
          { isLoading
            ? <Loading />
            : <h2 data-testid="header-user-name">{ profileName }</h2>}
        </div>
        <nav>
          <Link data-testid="link-to-search" to="/search"> Pesquisa </Link>
          <Link data-testid="link-to-favorites" to="/favorites"> Favoritas </Link>
          <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
