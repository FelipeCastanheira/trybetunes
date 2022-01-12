import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import trybeTunes from '../img/trybe-tunes.png';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      isButtonDisabled: true,
      isLoading: false,
      goSearch: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.removeLoading = this.removeLoading.bind(this);
  }

  componentWillUnmount() {
    this.removeLoading();
  }

  handleChange({ target }) {
    this.setState({ loginName: target.value }, () => {
      const MIN_LENGTH = 3;
      const { loginName } = this.state;
      const invalidName = loginName.length < MIN_LENGTH;
      this.setState({ isButtonDisabled: invalidName });
    });
  }

  handleClick(object) {
    this.setState({ isLoading: true }, async () => {
      await createUser(object);
      // this.setState({ isLoading: false });
    });
  }

  removeLoading() {
    this.setState({ isLoading: false, goSearch: true });
  }

  render() {
    const { loginName, isButtonDisabled, isLoading, goSearch } = this.state;
    return (
      <main data-testid="page-login">
        <header>
          <img src={ trybeTunes } alt="trybe-tunes" />
        </header>
        <form>
          <input
            type="text"
            value={ loginName }
            name="loginName"
            placeholder="Nome"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            disabled={ isButtonDisabled }
            type="submit"
            data-testid="login-submit-button"
            onClick={ async () => this.handleClick({ name: loginName }) }
          >
            Entrar
          </button>
        </form>
        {isLoading && <Loading />}
        {goSearch && <Redirect to="/search" />}
      </main>
    );
  }
}

export default Login;
