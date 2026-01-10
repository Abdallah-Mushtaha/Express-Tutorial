export class Reviews {
    constructor(reviewData) {
        this.reviewData = reviewData
    }
    save = (cb) => {
        dbConiction("reviews", async (db) => {
            try {
                await db.insertOne(this.reviewData); // will add the document to the collection
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
        })
    }
}