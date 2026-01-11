export class Reviews {
    constructor(reviewData) {
        this.reviewData = reviewData
    }
    save = (cb) => {
        dbConiction("reviews", async (db) => {
            try {
                // const reviewer = await db.findOne({
                //     name: this.reviewData.name, _id: null
                // });
                // if (reviewer) {
                //     // update ({condition}, {update})
                //     db.update({ name: this.reviewData.name, _id: null }, { $set: { _id: this.reviewData.ID_User , name: this.reviewData.name } ,upset : true});
                // } else {
                //     // insert
                //     await db.insertOne(this.reviewData); // will add the document to the collection
                // }
                // update ({condition}, {update})
                await db.update({ name: this.reviewData.name, _id: null }, { $set: { _id: this.reviewData.ID_User, name: this.reviewData.name }, upset: true });
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