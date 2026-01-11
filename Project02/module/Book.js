import { dbConiction } from "../config/index.js";


export class Book {
    // حساب عدد الذين قرؤا 
    static refreshAvgRating(_book_id) {
        dbConiction('reviews', async (db) => {
            const reviews = await db.find(
                { _book_id: _book_id }
            ).toArray()

            let sum = 0
            const count = reviews.length

            for (let i = 0; i < count; i++) {
                if (reviews[i].rating) {
                    sum += reviews[i].rating
                }
            }

            const avg = sum / count
            dbConiction('books', async (db) => {
                await db.updateOne(
                    { _id: _book_id },
                    { $set: { avg_rating: avg } }
                )
            })

        })
    }
}