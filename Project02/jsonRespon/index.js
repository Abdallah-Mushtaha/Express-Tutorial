export const returnJson = (res, statusCode, status, message, data) => {
    return res.status(statusCode).json({
        status: {
            status,
            message
        },
        data
    });
};
