import * as Yup from 'yup';

const USERNAME_SCHEMA = Yup.string().matches(/^[a-z0-9_-]{3,15}$/i, 'Incorrect username').required();
const EMAIL_SCHEMA = Yup.string().email('Incorrect email').required();
// const PASSWORD_SCHEMA = Yup.string().matches(/^(?=.*?[a-z])(?=.*?[0-9]).{4,32}$/, 'Incorrect password').required();
const PASSWORD_SCHEMA = Yup.string().matches(/^[a-z0-9_-]{3,15}$/i, 'Incorrect password').required();
export const SIGN_IN_SCHEMA = Yup.object({
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
});

export const SIGN_UP_SCHEMA = Yup.object({
  username: USERNAME_SCHEMA,
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
  passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Password does not match.'),
});