
export const validateEmail = value => {
  const email_re = new RegExp('[^@]+@[^@]+\.[^@]+'); // eslint-disable-line
  return !value || !value.match(email_re)
    ? 'Must use a valid email'
    : undefined;
};

export const validateNotNull = value => !value ? 'This field is required' : undefined;

export const validatePassword = value => !value || value.length <= 9 ? 'A password must be at least 9 characters' : undefined;
