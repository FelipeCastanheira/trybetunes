import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        Profile
        <Header nav="profile" />
      </div>
    );
  }
}

export default Profile;
