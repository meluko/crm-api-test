'use strict';

const Joi = require('joi');

const id = Joi.number().integer().positive();

const userId = Joi.object({
  userId: id.required()
});

const userBody = Joi.object({
  name: Joi.string().regex(/[A-Za-z]/).max(16).required(),
  surname: Joi.string().regex(/[\S A-Za-z]/).max(32).required(),
  isAdmin: Joi.boolean().default(false)
});

module.exports = {
  userId,
  userBody
};
