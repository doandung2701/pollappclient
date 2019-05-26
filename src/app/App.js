import React, { Component } from 'react';
import './App.css';
import {
  Route,
  Switch,
  Router
} from 'react-router-dom';
import NewPoll from '../poll/NewPoll';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import NotFound from '../common/NotFound';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
import LoginContainer from '../user/login/LoginContainer';
import { history } from '../util/Helpers';
import AppHeaderContainer from '../common/AppHeaderContainer';
import PollListContainer from '../poll/PollListContainer';
import ProfileContainer from '../user/profile/ProfileContainer';
import NewPollContainer from '../poll/NewPollContainer';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.props.loadCurrentUser();
  }

  componentDidMount() {
    this.loadCurrentUser();
  }
  render() {  
    return (
      <Router history={history}>
        <Layout className="app-container">
          <AppHeaderContainer history={history}/>

          <Content className="app-content">
            <div className="container">
              <Switch>      
                <Route exact path="/" 
                  render={(props) => <PollListContainer {...props} />}>
                </Route>
                <Route path="/login" 
                  render={(props) => <LoginContainer {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/users/:username" 
                  render={(props) => <ProfileContainer  {...props}  />}>
                </Route>
                <PrivateRoute path="/poll/new" component={NewPollContainer}/>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
        </Router>
    );
  }
}

export default App;