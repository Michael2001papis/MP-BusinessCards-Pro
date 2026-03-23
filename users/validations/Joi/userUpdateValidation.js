const Joi = require("joi");

// ולידציה לעדכון משתמש (שינויים בסיסיים + החלפת סיסמה)
const userUpdateValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(256).optional(),
      middle: Joi.string().allow("").optional(),
      last: Joi.string().min(2).max(256).optional(),
    }).optional(),
    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .rule({ message: 'user "phone" must be a valid phone number' })
      .optional(),
    image: Joi.object({
      url: Joi.string().uri().allow("").optional(),
      alt: Joi.string().min(2).max(256).allow("").optional(),
    }).optional(),
    address: Joi.object({
      state: Joi.string().allow("").optional(),
      country: Joi.string().optional(),
      city: Joi.string().optional(),
      street: Joi.string().optional(),
      houseNumber: Joi.number().optional(),
      zip: Joi.number().optional(),
    }).optional(),
    // שינוי סיסמה
    password: Joi.string()
      .ruleset.regex(/((?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{7,20})/)
      .rule({ message: 'password must be 7-20 chars and include uppercase, lowercase and a number' })
      .optional(),
  });
  return schema.validate(user);
};

module.exports = userUpdateValidation;