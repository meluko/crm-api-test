'use strict';

const Joi = require('joi');

const id = Joi.number().integer().positive();

const customerId = Joi.object({
  customerId: id.required()
});

const customerBody = Joi.object({
  name: Joi.string().regex(/[A-Za-z]/).max(16).required(),
  surname: Joi.string().regex(/[\s A-Za-z]/).max(32).required(),
  imageMetaId: [id.optional(), Joi.allow(null)]
});

module.exports = {
  customerId,
  customerBody
};
