import { connect } from 'react-redux';
import { post } from '../utils/api';
import { setStore } from '../utils/localStore';
import page from './page';

export const actions = {
  SIGNING_UP: 'SIGNING_UP ',
  FAILED_SIGNUP: 'FAILED_SIGNUP',
  SUCCESSFUL_SIGNUP: 'SUCCESSFUL_SIGNUP',
};

export const signupUser = (payload) => (dispatch) => {
  dispatch({ type: actions.SIGNING_UP });
  return post('auth/signup', payload)
    .then(
      (data) => {
        setStore({ key: 'user', value: data, json: true });
        dispatch({ type: actions.SUCCESSFUL_SIGNUP, data });
      },
      data => dispatch({ type: actions.FAILED_SIGNUP, data }),
    );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  signupError: state.auth.signupError
});

const mapDispatchToProps = (dispatch) => ({
  signupUser: (payload) => {
    dispatch(signupUser(payload));
  },
});

const Signup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(page);

export default Signup;
