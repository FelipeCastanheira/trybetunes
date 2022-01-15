import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { updateUser } from '../services/userAPI';
import Loading from './Loading';

class UpdateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.updateUser();
  }

  updateUser = async () => {
    // const { user, history } = this.props;
    await updateUser(user);
    this.setState({ isLoading: false });
    // history.push('/profile');
  }

  render() {
    const { isLoading } = this.state;
    return (
      <section>
        { isLoading && <Loading />}
      </section>
    );
  }
}

// UpdateUser.propTypes = {
//   user: PropTypes.objectOf(PropTypes.string).isRequired,
// };

export default UpdateUser;
