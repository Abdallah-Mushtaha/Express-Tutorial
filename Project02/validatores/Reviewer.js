import joi from "@hapi/joi";

export const reviewerSchema = joi.object({
    _reviewerID: joi.string().required(),
    _bookID: joi.string().required(),
    rating: joi.number().required(),
    comment: joi.string().required()
})