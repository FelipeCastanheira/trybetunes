import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/search" component={ Search } />
          <Route exact path="/" component={ Login } />
          {/* {A rota para o profile/edit recebe as props
            para poder utilizar o history, a fim de redirecionar para o profile} */}
          <Route
            exact
            path="/profile/edit"
            render={
              (props) => <ProfileEdit { ...props } />
            }
          />
          <Route component={ NotFound } />
        </Switch>
      </Router>
    );
  }
}

export default App;
