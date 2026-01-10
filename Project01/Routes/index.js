import studentRouter from "../Student/index.js";
module.exports = (app) => {

    // Route: /home
    app.get("/home", (req, res) => {
        res.send("<h1>Hello in page1</h1>");
    });

    // Route: /
    app.get("/", (req, res) => {
        res.redirect("/home");
    });
    app.get("/coures", (req, res) => {
        res.status(200).json([{ name: "Ali", age: 20 }, { name: "Ramy", age: 60 }])
    })
    app.get("/requist", (req, res, next) => {
        console.log(req.query) //  { name: 'Ramy', age: '60' } will get the query string oject of the url
        console.log(req.query.name) // return the name of the query string
        console.log(req.headers) // will return the headers of the request
        console.log(req.headers.host) // will return the host from headers of the request
        console.log(req.get('Content-Type')) // will return the content type from headers of the request
        console.log(req.get('Host')) // will return the host from headers of the request

    })


    // بنحصل على الداتا من اي ريكوست ب ثلاث طرق اما عبر الهيدر او عبر الجيت براميتر او عبر البوست 

    app.get("/data/:id", (req, res) => {
        const courses = [
            {
                id: 1,
                name: "HTML",
                description: "HTML Description"
            },
            {
                id: 2,
                name: "CSS",
                description: "CSS Description"
            }

        ]
        const id = req.params.id // the path parameter act with Route not with http Request
        console.log(id)
        const course = courses.find((course) => course.id == id)
        res.status(200).json(course)

    })
    //  multiple path parameters 
    app.get("/user/:id/posts/:postId", (req, res) => {
        console.log('id', req.params.id);
        console.log('postId', req.params.postId);

    })

    // routing groups
    app.use("/students", studentRouter)
}