const Joi = require('joi');

const addEmployeeSchema = Joi.object({
    name: Joi.string().required().max(50).min(4),
    designation: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other'),
    date_of_joining: Joi.date()
})

module.exports = {
    addEmployeeSchema
}