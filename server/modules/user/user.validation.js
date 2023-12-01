import Joi from "joi";

const signUpValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9]{3,8}$/)
    .required(),
  confirmPassword: Joi.string(),
  phone: Joi.string()
    .pattern(/^01[0125][0-9]{8}$/)
    .required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
  weight: Joi.number().required(),
  height: Joi.number().required(),
  picture: Joi.string(),
});

const signInSchem = Joi.object({
  email: Joi.string()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
  password: Joi.string().required(),
});

export { signUpValidationSchema, signInSchem };
