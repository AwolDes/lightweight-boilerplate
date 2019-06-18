import React from 'react';
import PropTypes from 'prop-types';
import { BasicText, asField } from 'informed';

export const ErrorText = asField(({ fieldState, ...props }) => (
  <React.Fragment>
    <BasicText
      fieldState={fieldState}
      {...props}
      style={fieldState.error ? { border: 'solid 1px red' } : null}
    />
    {fieldState.error ? (
      <small style={{ color: 'red' }}>{fieldState.error}</small>
    ) : null}
  </React.Fragment>
));

export const TextValidationField = ({
  descriptor,
  fieldName,
  type,
  validator
}) => (
  <div className="form--field">
    <label> {/*eslint-disable-line*/}
      {descriptor}: {/*eslint-disable-line*/}
      <ErrorText field={fieldName} type={type} validate={validator} validateOnBlur />
    </label>
  </div>
);

TextValidationField.propTypes = {
  descriptor: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  validator: PropTypes.func.isRequired,
};
