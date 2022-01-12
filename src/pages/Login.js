import React from 'react';
import trybeTunes from '../img/trybe-tunes.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      isButtonDisabled: true,
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

  render() {
    const { loginName, isButtonDisabled } = this.state;
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
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
