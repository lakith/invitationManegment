import React, { Component } from 'react';
import './App.css';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom'
import Home from './containers/home/home';
import 'semantic-ui-css/semantic.min.css';
import 'react-notifications/lib/notifications.css';
import * as actions from './store/index'
import {connect} from 'react-redux'
import Login from './containers/auth/login';
import Register from './containers/auth/Register/register';
import Logout from './containers/auth/Logout/logout';
import EventCreationMain from './containers/EventCreationMain/EventCreationMain';
import EventCreationBase from './containers/EventCreationBase/EventCreationBase';
import Myevents from './containers/MyEvents/MyEvents';
import Test from './containers/Test/Test';
import EventController from './containers/EventController/EventController';
import HomeBase from './containers/HomeBase/HomeBase';
import UserProfile from './containers/UserProfile/UserProfile';
import UserSearch from './containers/UserSearch/UserSearch';

class App extends Component {
  
  componentDidMount(){
    
 //   this.props.onTryAutoSignUp();
  }

  render() {
    let routes = null;
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/event-main" component={EventCreationMain} />
          <Route path="/event-base" component={EventCreationBase} />
          <Route path="/my-events" component={Myevents} />
          <Route path="/event-controller/:id" component={EventController} />
          <Route path="/test" component={Test} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/user-search" component={UserSearch} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/event-main" component={EventCreationMain} />
          <Route path="/event-base" component={EventCreationBase} />
          <Route path="/my-events" component={Myevents} />
          <Route path="/event-controller/:id" component={EventController} />
          <Route path="/test" component={Test} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/user-search" component={UserSearch} />
          <Route path="/" exact component={HomeBase} />
          <Redirect to="/" />
        </Switch>
      )
    }
    



    return (
      <div>
       {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.accessToken != null
  }
};

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp : () => dispatch (actions.authCheckState())
  }
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
