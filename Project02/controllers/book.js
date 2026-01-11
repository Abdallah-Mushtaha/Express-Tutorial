import { dbConiction } from "../config/index.js";
import { ObjectId } from "bson";
import createError from "http-errors";



export const getbooks = (req, res, next) => {
    const pathNumber = parseInt(req.query.page);
    const errors = createError(400, "Invalid path parameter");

    if (isNaN(pathNumber)) {
        // return res.status(errors.status).json({ message: errors.message });
        return next(errors);
    }
    console.log(pathNumber);

    const limit = 10;
    /*
    page  limit  skip 
     1      10     0
     2      10     10
     3      10     20
    */

    const skip = (pathNumber - 1) * limit;

    dbConiction("books", async (db) => {
        const errors = createError(500, "Error fetching books");

        try {
            const books = await db.find({}).limit(limit).skip(skip).toArray();
            // res.json(books);
            returnJson(res, 200, 200, "Success", books);
        } catch (error) {
            // res.status(errors.status).json({ message: errors.message });
            next(errors);
        }
    });
};

export const getBooksCount = (req, res) => {
    const errors = createError(500, "Error fetching books count");
    dbConiction("books", async (db) => {
        const limit = 10;
        try {
            const count = await db.count({});
            const pages = Math.ceil(count / limit);
            // res.json({ pages: pages });
            returnJson(res, 200, 200, "Success", { pages });
        } catch (error) {
            // res.status(errors.status).json({ message: errors.message });
            next(errors);
        }
    });
};

export const getBooksById = (req, res) => {
    const errors = createError(400, "Invalid book ID");
    const errors2 = createError(404, "Book not found");

    if (!ObjectId.isValid(req.params.id)) return res.status(errors.status).json({ message: errors.message });
    const id = new ObjectId(req.params.id);
    dbConiction("books", async (db) => {
        try {
            const book = await db.findOne({ _id: id });
            if (book) {
                // res.json(book);
                returnJson(res, 200, 200, "Success", book);
            } else {
                // res.status(errors2.status).json({ message: errors2.message });
                next(errors2);
            }
        } catch (error) {
            // res.status(500).json({ message: "Error fetching book" });
            next(createError(500, "Error fetching book"));
        }
    });
};