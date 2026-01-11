import { Reviwer, Book } from "../module/index.js";
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
            Book.refreshAvgRating(reviwer.reviewData._bookID); // تحديث عدد  المشاهدات 
        } else {
            return next(createError(status.status, status.message));
        }
    })
}
export const remove = (req, res, next) => {
    const _id = req.params.id;
    const getReview = Reviwer.getone(_id);
    if (!getReview) {
        return next(createError(404, "review not found"));
    }
    Reviwer.remove(_id, (status) => {
        if (status.status === 200) {
            // res.status(status.status).json(status);
            returnJson(res, status.status, status.status, status.message, {});
            Book.refreshAvgRating(getReview._bookID);

        } else {
            return next(createError(status.status, status.message));
        }
    })
}
