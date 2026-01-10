import { User, Reviews } from "../module/index.js";
import createError from "http-errors";

export const Sign_in = (req, res, next) => {
    const userData = req.body;

    const validation = User.validation(userData);
    if (validation.error) {
        next(createError(400, validation.error.message));
    }

    const currentuser = new User(userData)
    currentuser.userExists()
        .then((result) => {
            console.log(result);
            if (result.check === false) {

                currentuser.save();
            } else {
                next(createError(409, result.message));
            }
        })
        .catch((error) => {
            next(createError(500, error.message));
        })
    currentuser.save(
        (status) => {
            if (status.status === 200) {
                const ID_User = status._user_id
                const reviewer = new Reviews({ ID_User, name: userData.name });
                reviewer.save(
                    (status) => {
                        if (status.status === 201) {
                            res.status(status.status).json(status);
                        } else {
                            next(createError(status.status, "user created but can't add review"));
                        }
                    }
                );

            } else {
                next(createError(status.status, status.message));
            }
        }
    )
}
