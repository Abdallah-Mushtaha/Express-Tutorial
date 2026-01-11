import { dbConiction } from "../config/index.js";
import { reviewerValidator } from "../validatores/index.js";
export class Reviwer {
    constructor(reviewData) {
        this.reviewData = reviewData
    }
    save(cb) {
        try {
            dbConiction("reviews", async (db) => {
                await db.update({
                    _bookID: this.reviewData._bookID,
                    _reviewerID: this.reviewData._reviewerID
                }, { $set: { _bookID: this.reviewData._bookID, _reviewerID: this.reviewData._reviewerID, rating: this.reviewData.rating, comment: this.reviewData.comment }, upset: true });
            })
            cb({
                status: 201,
                message: "review added successfully"
            });

        } catch (error) {
            cb({
                status: 500,
                message: "Error adding review"
            });
        }
    }
    static validation(reviewData) {
        return reviewerValidator.validate(reviewData);
    }
    static getone = (_id) => {
        return new Promise((resolve, reject) => {
            dbConiction('reviews', async (db) => {
                try {
                    const review = await db.findOne({ _id: _id });
                    if (!review) {
                        throw createError(404, "review not found");
                    }
                    return review

                } catch (error) {
                    throw createError(500, "Error fetching review");
                }
            })
        })
    }

    static remove(_id, cb) {
        try {
            dbConiction('reviews', async (db) => {
                await db.deleteOne({ _id: _id });
                cb({
                    status: 200,
                    message: "review deleted successfully"
                });
            })
        } catch (error) {
            cb({
                status: 500,
                message: "Error deleting review"
            });
        }
    }

}
