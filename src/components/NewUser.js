import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.newUser();
  }

  newUser = async () => {
    const { person } = this.props;
    const data = await createUser({ name: person });
    this.setState({ userList: data.results, isLoading: false });
  }

  render() {
    const { userList, isLoading } = this.state;
    console.log(userList);
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
