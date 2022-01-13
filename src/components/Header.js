import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
        { isLoading
          ? <Loading />
          : <h2 data-testid="header-user-name">{ profileName }</h2>}
      </header>
    );
  }
}

export default Header;
