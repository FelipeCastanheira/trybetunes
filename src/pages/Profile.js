import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        description: '',
        email: '',
        image: '',
        name: '',
      },
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const data = await getUser();
    this.setState({ userInfo: data });
  }

  render() {
    const { userInfo: { description, email, image, name } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header nav="profile" />
        <section>
          <h3>{name}</h3>
          <h4>{email}</h4>
          <img src={ image } data-testid="profile-image" alt="usuário" />
          <p>{description}</p>
          <Link to="/profile/edit">
            <h5>Editar perfil</h5>
          </Link>
        </section>
      </div>
    );
  }
}

export default Profile;
