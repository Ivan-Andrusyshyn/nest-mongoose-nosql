import * as joi from '@hapi/joi';

export const configValidationSchema = joi.object({
  URL_MONGO: joi.string().required(),
  JWT_KEY: joi.string().required(),
});
