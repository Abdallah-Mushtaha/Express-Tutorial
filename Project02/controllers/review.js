import { Reviwer } from "../module/index.js";
import createError from "http-errors";

import { ObjectId } from "bson";

export const add = (req, res, next) => {
    const reviewData = req.body;
    // _bookingId ,rating, Comment 
    reviewData.reviewerID = req.user._id;
    const validation = Reviwer.validation(reviewData);
    if (validation.error) {
        return next(createError(400, validation.error.message));
    }
    let reviwer = new Reviwer(reviewData);
    reviwer.reviewData._bookID = new ObjectId(req.params.id);
    reviwer.reviewData._reviewerID = new ObjectId(req.user._id);

    reviwer.save((status) => {
        if (status.status === 201) {
            res.status(status.status).json(status);
        } else {
            return next(createError(status.status, status.message));
        }
    })
}