import React from 'react';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import trybeTunes from '../img/trybe-tunes.png';
import style from './Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      isButtonDisabled: true,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ loginName: target.value }, () => {
      const MIN_LENGTH = 3;
      const { loginName } = this.state;
      const invalidName = loginName.length < MIN_LENGTH;
      this.setState({ isButtonDisabled: invalidName });
    });
  }

  handleNewUser = async (event) => {
    event.preventDefault();
    const { loginName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: loginName });
    this.setState({ isLoading: false, redirect: true });
  }

  render() {
    const {
      loginName,
      isButtonDisabled,
      isLoading,
      redirect,
    } = this.state;
    return (
      <main className={ style.login } data-testid="page-login">
        <header>
          <img src={ trybeTunes } alt="trybe-tunes" />
        </header>
        {isLoading && <Loading />}
        <form className="login-form">
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
            onClick={ this.handleNewUser }
          >
            Entrar
          </button>
        </form>
        {redirect && <Redirect to="/search" />}
      </main>
    );
  }
}

export default Login;
