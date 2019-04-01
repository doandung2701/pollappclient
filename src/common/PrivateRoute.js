import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
  import { connect } from "react-redux";
 const mapStateToProps = (state) => ({
  authenticated:state.loginReducer.authenticated
 })
 
 const mapDispatchToProps =dispatch=> {
   
 }
  
  
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
);
  
export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);