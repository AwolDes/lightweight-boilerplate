import React, { useEffect } from 'react';
import { Form } from 'informed';
import PropTypes from 'prop-types';
import { TextValidationField } from '../common/components/forms';
import { validateEmail, validatePassword } from '../common/components/forms/validations';

const Login = ({
  loginUser,
  user,
  loginError,
  history
}) => {
  useEffect(() => {
    if (user.accessToken) {
      // redirect because user is logged in
      history.push('/strategies');
    }
  }, [user, history]);

  return (
    <>
      <h1>User login</h1>
      <Form onSubmit={formState => loginUser(formState)} className="form--container-centered">
        <>
          {loginError ? <p style={{ color: 'red' }}>{loginError}</p> : null}
          <div>
            <TextValidationField descriptor="Email" fieldName="email" type="email" validator={validateEmail} />
            <TextValidationField descriptor="Password" fieldName="password" type="password" validator={validatePassword} />
            <button type="submit">Login</button>
          </div>
        </>
      </Form>
    </>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loginError: PropTypes.any, // eslint-disable-line
};

export default Login;
