import { User, Reviews } from "../module/index.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import ReadFileSync from "fs";
import { json } from "stream/consumers";

export const Sign_in = (req, res, next) => {
    const userData = req.body;

    const validation = User.validation(userData);
    if (validation.error) {
        return next(createError(400, validation.error.message));
    }

    const currentuser = new User(userData)
    currentuser.userExists()
        .then((result) => {
            console.log(result);
            if (result.check === false) {

                currentuser.save();
            } else {
                return next(createError(409, result.message));
            }
        })
        .catch((error) => {
            return next(createError(500, error.message));
        })
    currentuser.save(
        (status) => {
            if (status.status === 200) {
                const ID_User = status._user_id
                const reviewer = new Reviews({ ID_User, name: userData.name });
                reviewer.save(
                    (status) => {
                        if (status.status === 201) {
                            // res.status(status.status).json(status);
                            returnJson(res, status.status, status.status, status.message, status.data);
                        } else {
                            return next(createError(status.status, "user created but can't add review"));
                        }
                    }
                );

            } else {
                return next(createError(status.status, status.message));
            }
        }
    )
}

export const Log_in = (req, res, next) => {
    User.login(req.body)
        .then((result) => {
            if (result.status === 200) {
                const JWTKey = ReadFileSync("./config/privet.key");

                const token = jwt.sign({ _id: result._id, reviewerID: result.reviewerID }, JWTKey);
                // res.status(result.status).json(result);
                returnJson(res, result.status, result.status, result.message, { token });
            }
            else {
                return next(createError(result.status, result.message));
            }
        })
        .catch((error) => {
            return next(createError(500, error.message));
        })
}

