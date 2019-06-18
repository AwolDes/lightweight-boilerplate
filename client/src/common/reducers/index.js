import {
  actions as loginActions,
} from '../../login';

import {
  actions as signupActions,
} from '../../signup';

const actions = { ...loginActions, ...signupActions };

const initialState = {
  user: {},
  loginError: null,
  signupError: null,
};

export const Auth = (state = initialState, action) => {
  switch (action.type) {
    case (actions.LOGGING_IN):
      return Object.assign({}, state, {
        loginError: null,
      });

    case (actions.SUCCESSFUL_LOGIN):
      return Object.assign({}, state, {
        user: action.data,
        loginError: null,
      });

    case (actions.FAILED_LOGIN):
      return Object.assign({}, state, {
        loginError: action.data.message,
      });

    case (actions.SIGNING_UP):
      return Object.assign({}, state, {
        signupError: null,
      });

    case (actions.SUCCESSFUL_SIGNUP):
      return Object.assign({}, state, {
        user: action.data,
        signupError: null,
      });

    case (actions.FAILED_SIGNUP):
      return Object.assign({}, state, {
        signupError: action.data.message
      });

    default:
      return state;
  }
};
