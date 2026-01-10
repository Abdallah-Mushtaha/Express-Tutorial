module.exports = (app) => {

    // The Middleware act with all the requests not just the Routes  يعني اولا الريكوت بتوجه للميدل وير ثم يتقل للراوت المخصص له 
    // the middleware use to breProcess the request an preCondition 
    // يعني مثلا في حال بدي مع الريكوست مش =مبعتوت ال lang اعرف لغة الموقع بقلو فل ميدل وير وقف حددلي اللغة بعدها ببعت الريكوست 
    //  الترتيب مهم جدا لانو نيكست الميدل وير الاول بيسلم الثاني وبعدها بيسلم للرات البعدوا وهكذا 
    app.use((req, res, next) => {
        const lang = req.query.lang;
        if (lang === 'en' || lang === 'ar') {
            next();
        } else {
            res.status(400).send('u should send the lang  en or ar');
        }


    })

    app.use((req, res, next) => {
        console.log('middleware 2');
        next();
    })

}