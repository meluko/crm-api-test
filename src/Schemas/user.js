'use strict';

const Joi = require('joi');

const id = Joi.number().integer().positive();

const userId = Joi.object({
  userId: id.required()
});

const userBody = Joi.object({
  id: userId.optional(),
  name: Joi.string().regex(/[A-Za-z]/).max(16).required(),
  surname: Joi.string().regex(/[\S A-Za-z]/).max(32).required(),

});

module.exports = {
  userId,
  userBody
};
