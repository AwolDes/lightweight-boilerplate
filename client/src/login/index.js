import { connect } from 'react-redux';
import { post } from '../utils/api';
import { setStore } from '../utils/localStore';
import app from './page';

export const actions = {
  LOGGING_IN: 'LOGGING_IN ',
  FAILED_LOGIN: 'FAILED_LOGIN',
  SUCCESSFUL_LOGIN: 'SUCCESSFUL_LOGIN',
};

export const loginUser = (payload) => (dispatch) => {
  dispatch({ type: actions.LOGGING_IN });
  return post('auth/login', payload)
    .then(
      (data) => {
        setStore({ key: 'user', value: data, json: true });
        dispatch({ type: actions.SUCCESSFUL_LOGIN, data });
      },
      data => dispatch({ type: actions.FAILED_LOGIN, data }),
    );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loginError: state.auth.loginError
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload) => {
    dispatch(loginUser(payload));
  },
});

const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(app);

export default Login;
