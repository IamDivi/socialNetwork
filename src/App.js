import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login.jsx';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './app-reducer'
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }
   return( <div className="app_wrapper">
    <HeaderContainer />
    <div className="app_wrapper_content">
      <Route path="/dialogs" render={() => <DialogsContainer />} />
      <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
      <Route path="/friends" render={() => <UsersContainer />} />
      <Route path="/login" render={() => <Login />} />
    </div>
  </div>)
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})
export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)
