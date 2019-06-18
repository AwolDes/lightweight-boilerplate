import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { successResponse, errResponse } from '../factories/response';

const saltRounds = 10;

export const createUser = (event, context, callback) => {
  const body = JSON.parse(event.body);
  bcrypt.hash(body.password, saltRounds)
  .then((password) => {
    const user = new User({
      email: body.email,
      firstName: 'Joe',
      lastName: 'Bloggs',
      password,
    });
    // eslint-disable-next-line consistent-return
    user.save((err) => {
      if (err) {
        console.log(err);
        return callback(null, errResponse(err));
      }
      // eslint-disable-next-line no-param-reassign
      const data = user.toJSON();
      delete data.password;
      console.log(`Successfully created user: ${data.uuid}`);
      callback(null, successResponse(data));
    });
  })
  .catch(err => console.log(err) || callback(null, errResponse(err)));
};

export const getUser = (event, context, callback) => {
  User
    .query(event.pathParameters.userId)
    .attributes(['uuid', 'firstName', 'lastName'])
    // eslint-disable-next-line consistent-return
    .exec((err, data) => {
      if (err) {
        console.log(err);
        return callback(null, errResponse(err));
      }
      // 30322ad0-0716-48df-ac46-4bfb2368d8f6
      console.log(data);
      if (data.Items.length === 0) {
        callback(null, errResponse('User does not exist'));
      }
      const user = data.Items[0];

      console.log(`Successfully retrieved user: ${user}`);
      callback(null, successResponse(user));
    });
};
export const updateUser = (event, context, callback) => {
  const body = JSON.parse(event.body);
  // eslint-disable-next-line consistent-return
  User.update({ uuid: event.pathParameters.userId, ...body }, (err, user) => {
    if (err) {
      console.log(err);
      return callback(null, errResponse(err));
    }
    console.log(user);
    console.log(`updated account ${user.get('uuid')}`);
    // eslint-disable-next-line no-param-reassign
    delete user.attrs.password;
    callback(null, successResponse(user.attrs));
  });
};
