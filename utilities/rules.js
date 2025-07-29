const Joi = require("joi")

const newUser = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
})

const newEvent = Joi.object({
    title : Joi.string().min(5).required(),
    date_time: Joi.date().iso().required(),
    location : Joi.string().required(),
    capacity : Joi.number().required()
    
})

const newRegistration = Joi.object({
    userId : Joi.number().required(),
    eventId : Joi.number().required()
})


const cancelRegistration = Joi.object({
    userId : Joi.number().required(),
    eventId: Joi.number().required()
})

const postComment = Joi.object({
    comment: Joi.string().min(1).required(),
    post_id: Joi.number().required()
})








//####################################################

//admin Rules

module.exports = {
    newUser, 
    newEvent,
    newRegistration,
    cancelRegistration,
    postComment
}