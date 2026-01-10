import joi from "@hapi/joi";

export const userSchema = joi.object({
    name: joi.string().min(2).max(30).required(),
    email: joi.string().email().required(),
    username: joi.string().min(2).max(10).alphanum().required(),
    password: joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]+$')).message('Password must contain at least one special character').required()

})
// regular expression بمعنى رح اكتب الشرط على شكل سترينك حروف
// .+[A-Z].+
// .+[a-z].+
// .+[0-9].+
// .+[!@#$%^&*].+
// .+[a-zA-Z0-9!@#$%^&*].+

