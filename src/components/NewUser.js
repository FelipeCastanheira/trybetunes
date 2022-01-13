import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.newUser();
  }

  newUser = async () => {
    const { person } = this.props;
    await createUser({ name: person });
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <section className="new-user">
        { isLoading ? <Loading /> : <Redirect to="/search" />}
      </section>
    );
  }
}

NewUser.propTypes = {
  person: PropTypes.string.isRequired,
};

export default NewUser;
