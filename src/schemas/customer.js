'use strict';

const Joi = require('joi');

const NAME_REGEX = /^[A-Za-z]+$/;
const SURNAME_REGEX = /^[\sA-Za-z]+$/;

const id = Joi.number().integer().positive();

const customerId = Joi.object({
  customerId: id.required()
});

const customerBody = Joi.object({
  name: Joi.string().regex(NAME_REGEX).max(16).required(),
  surname: Joi.string().regex(SURNAME_REGEX).max(32).required(),
  imageMetaId: [id.optional(), Joi.allow(null)]
});

module.exports = {
  customerId,
  customerBody
};
