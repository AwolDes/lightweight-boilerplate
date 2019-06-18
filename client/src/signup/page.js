import React, { useEffect } from 'react';
import { Form, useFormState } from 'informed';
import PropTypes from 'prop-types';
import { TextValidationField } from '../common/components/forms';
import { validateEmail, validatePassword, validateNotNull } from '../common/components/forms/validations';

import '../common/scss/forms.scss';

const ConfirmPassword = () => {
  const formState = useFormState();
  const { password } = formState.values;
  return (
    <TextValidationField
      descriptor="Confirm Password"
      fieldName="confirmPassword"
      type="password"
      validator={value => value !== password ? 'Passwords do not match' : undefined}
    />
  );
};

const Signup = ({
  signupUser,
  user,
  signupError,
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
      <h1>Signup</h1>
      <Form onSubmit={formState => signupUser(formState)} className="form--container-centered">
        <>
          {signupError ? <p style={{ color: 'red' }}>{signupError}</p> : null}
          <div>
            <TextValidationField descriptor="Email" fieldName="email" type="email" validator={validateEmail} />
            <TextValidationField descriptor="First Name" fieldName="firstName" type="text" validator={validateNotNull} />
            <TextValidationField descriptor="Last Name" fieldName="lastName" type="text" validator={validateNotNull} />
            <TextValidationField descriptor="Password" fieldName="password" type="password" validator={validatePassword} />
            <ConfirmPassword />
            <button type="submit">Signup</button>
          </div>
        </>
      </Form>
    </>
  );
};

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signupError: PropTypes.any, // eslint-disable-line
};

export default Signup;
