import React from 'react';
import { connect } from 'react-redux';
import {
  setUser,
  setPassword,
  setIsLoggedIn,
  setLoadingState
} from '../redux/actions/userActions';
import { Redirect } from 'react-router-dom';

const Login = ({
  user,
  password,
  isLoggedIn,
  loadingState,
  dispatch,
}) => {
  const logIn = () => {
    dispatch(setLoadingState('loading'));
    setTimeout(() => { // network call would be here (axios or fetch)
      // fake doing something on the server
      if (user === 'brian' && password === '123') {
        dispatch(setIsLoggedIn(true));
        dispatch(setLoadingState('init'));
      } else {
        dispatch(setLoadingState('error'));
      }
    }, 2000);
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (loadingState === 'loading') {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        {/* this is a comment */}
        User:
        <input
          value={user}
          onChange={e => dispatch(setUser(e.target.value))}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => dispatch(setPassword(e.target.value))}
        />
      </div>
      <div>
        {loadingState === 'error' && <b>User name or password incorrect</b>}
        <button onClick={logIn}>Log in</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  // this maps react props to redux state
  return {
    user: state.userReducer.user,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
    loadingState: state.userReducer.loadingState,
  };
};

export default connect(mapStateToProps)(Login);
