import React from 'react';
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
    await updateUser(user);
    this.setState({ isLoading: false });
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

export default UpdateUser;
