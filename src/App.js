import React, { Component } from 'react';
import './App.css';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom'
import Home from './containers/home/home';
import 'semantic-ui-css/semantic.min.css';
import * as actions from './store/index'
import {connect} from 'react-redux'
import Login from './containers/auth/login';
import Register from './containers/auth/Register/register';
import Logout from './containers/auth/Logout/logout';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    )


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
