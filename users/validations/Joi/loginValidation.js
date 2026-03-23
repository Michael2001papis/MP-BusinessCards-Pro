const Joi = require("joi");

const loginValidation = user => {
  const schema = Joi.object({
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'user "email" must be a valid email' })
      .required(),

    password: Joi.string()
      .ruleset.regex(
        /((?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{7,20})/
      )
      .rule({
        message:
          'user "password" must be 7-20 chars and include uppercase, lowercase and a number',
      })
      .required(),
  });
  return schema.validate(user);
};

module.exports = loginValidation;
