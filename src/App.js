import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login.jsx';
import ProfileContainer from './components/Profile/ProfileContainer.tsx';
import UsersContainer from './components/Users/UsersContainer.tsx';
import { initializeApp } from './app-reducer.ts'
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';


class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert("some error occured")
    console.error(promiseRejectionEvent);
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount(){
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);

  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (<div className="app_wrapper">
      <HeaderContainer />
      <div className="app_wrapper_content">
        <Switch>
          <Redirect exact from="/" to="/profile" />
          <Redirect exact from="/socialNetwork" to="/profile" />
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/friends" render={() => <UsersContainer pageTitle="friends" />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="*" render={() => <div>404 NOT FOUND</div>} />

        </Switch>
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
