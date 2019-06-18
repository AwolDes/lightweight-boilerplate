import dynogels from 'dynogels';
import Joi from 'joi';

dynogels.AWS.config.update({
  region: process.env.region,
});

export const User = dynogels.define('User', {
  hashKey: 'uuid',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,
  schema: {
    uuid: dynogels.types.uuid(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string(),
  },
  tableName: process.env.usersTableName,
});

