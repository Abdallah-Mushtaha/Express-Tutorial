import jwt from 'jsonwebtoken';
import creatError from 'http-errors';
import ReadFileSync from "fs";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return creatError(401, 'Not authenticated');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    const seacretKey = ReadFileSync("./config/privet.key");
    try {
        decodedToken = jwt.verify(token, seacretKey); // check token retarn data
    } catch (error) {
        return next(creatError(401, error.message));
    }
    if (!decodedToken) {
        return next(creatError(401, error.message));

    }
    req.userId = decodedToken.userId;
    req.reviewerID = decodedToken.reviewerID;
    next();
}