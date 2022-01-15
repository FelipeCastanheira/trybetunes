import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
// import UpdateUser from '../components/UpdateUser';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      email: '',
      image: '',
      name: '',
      isLoading: true,
      isButtonDisabled: true,
      // redirectToProfile: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, this.handleButton);
  }

  getInfo = async () => {
    const data = await getUser();
    this.setState({ description: data.description,
      email: data.email,
      image: data.image,
      name: data.name,
      isLoading: false });
  }

  handleButton = () => {
    const { description, email, image, name } = this.state;
    const isCompleted = description && email && image && name;
    this.setState({ isButtonDisabled: !isCompleted });
  }

  handleClick = (userObject) => {
    const { history } = this.props;
    updateUser(userObject).then(() => {
      history.push('/profile');
    });
  }

  render() {
    const { description, email, image, name,
      isLoading, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header nav="profile" />
        <h4>Editar perfil</h4>
        {/* {redirectToProfile && <UpdateUser user={ { description, email, image, name } } />} */}
        <input
          data-testid="edit-input-name"
          value={ name }
          name="name"
          onChange={ this.handleChange }
          type="text"
        />
        <input
          data-testid="edit-input-email"
          value={ email }
          name="email"
          onChange={ this.handleChange }
          type="email"
        />
        <input
          data-testid="edit-input-description"
          value={ description }
          onChange={ this.handleChange }
          type="textarea"
          name="description"
        />
        <input
          data-testid="edit-input-image"
          value={ image }
          onChange={ this.handleChange }
          name="image"
          type="text"
        />
        <button
          type="button"
          disabled={ isButtonDisabled }
          data-testid="edit-button-save"
          onClick={ () => this.handleClick({ description, email, image, name }) }
        >
          Salvar
        </button>
        {isLoading && <Loading />}
      </div>
    );
  }
}

export default ProfileEdit;
