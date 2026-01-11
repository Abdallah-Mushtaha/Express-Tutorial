import { dbConiction } from "../config/index.js";
import { userValidator, loginValidator } from "../validatores/index.js";
import hashsync from "bcryptjs";



export class User {
    constructor(userData) {
        this.userData = userData
    }
    save = (cb) => {
        dbConiction("users", async (db) => {
            try {
                this.userData.password = hashsync.hashSync(this.userData.password);
                await db.insertOne(this.userData) // will add the document to the collection
                    .then((result) => {
                        cb({
                            status: 201,
                            _user_id: result.insertedId
                        });
                    })
                // const user = await db.findOne({ email: this.userData.email });
                cb({
                    status: 201,
                    message: "user added successfully",
                    _user_id: user._id
                });
            } catch (error) {
                cb({
                    status: 500,
                    message: "Error adding user"
                });
            }
        })
    }
    static validation = (userData) => {
        try {
            const validator = userValidator.validate(userData);
            return validator
        } catch (error) {
            return { status: 400, message: error.message }
        }

    }

    userExists = () => {
        // Because we  handel a call back AS async function we need to return a promise to convert from async to sync
        return new Promise((resolve, reject) => {
            dbConiction("users", async (db) => {
                try {
                    const user = await db.findOne({
                        "$or": [
                            { email: this.userData.email },
                            { username: this.userData.username }
                        ]
                    })
                    if (!user) {
                        resolve({
                            check: false
                        })
                    } else {
                        if (user.email === this.userData.email) {
                            resolve({
                                check: true,
                                message: "email already exists"
                            })
                        } else {
                            resolve({
                                check: true,
                                message: "username already exists"
                            })
                        }
                    }
                } catch (error) {
                    reject({
                        status: 500,
                        message: "error fetching user"
                    })
                }
            })
        })
    }

    static login = (loginData) => {
        return new Promise((resolve, reject) => {
            const validator = loginValidator.validate(loginData);
            if (validator.error) {
                resolve({
                    status: 400,
                    message: validator.error.message
                })
            }
            dbConiction("users", async (db) => {
                try {
                    // check the userName then compare the password 
                    const user = await db.findOne({ username: loginData.username }, {
                        projection: {
                            username: 1,
                            password: 1,
                            _id: 0
                        }
                    });
                    if (user) {
                        dbConiction("reviews", async (db) => {
                            const review = await db.findOne({ _user_id: user._id }, {

                            })
                            if (review) {
                                user.review = review
                            } else {
                                resolve({
                                    status: true,
                                    data: user
                                })
                            }

                        })
                        const checkPassword = hashsync.compareSync(loginData.password, user.password);
                        if (checkPassword) {
                            resolve({
                                status: true,
                                data: user
                            })
                        } else {
                            reject({
                                status: false,
                                Code: 401,
                                message: "invalid password"

                            })
                        }
                    }

                } catch (error) {
                    reject({
                        status: 500,
                        message: error.message
                    })
                }
            })
        })

    }
}
// const userData = { name: "ramy", username: "Ramy", email: "ramy@gmail.com", password: "0125453bAs" }
// const user = new User(userData);
// // console.log(user);
// const validationResult = User.validation(userData);
// if (validationResult.error) {
//     console.log(validationResult.error.message);
// } else {
//     user.save();

// }
// user.userExists().then((status) => {
//     console.log(status);
//     if (status.check === false) {
//         user.save();
//     }
// })
