'use strict';

const Joi = require('joi');

const NAME_REGEX = /^[A-Za-z]+$/;
const SURNAME_REGEX = /^[\sA-Za-z]+$/;

const id = Joi.number().integer().positive();

const userId = Joi.object({
  userId: id.required()
});

const userBody = Joi.object({
  name: Joi.string().regex(NAME_REGEX).max(16).required(),
  surname: Joi.string().regex(SURNAME_REGEX).max(32).required(),
  isAdmin: Joi.boolean().default(false)
});

module.exports = {
  userId,
  userBody
};
