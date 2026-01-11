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
}
