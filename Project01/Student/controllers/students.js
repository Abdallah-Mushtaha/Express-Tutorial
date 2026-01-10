const getStudents = (req, res) => {
    // get data 
    res.send({
        name: "Ramy",
        age: 20,
        email: "ramy@ramy",
        password: "123456",
        isAdmin: true
    })
}
const getGrades = (req, res) => {
    res.send({
        name: "Ramy",
        email: "ramy@ramy",
        grade: 100
    })
}

const getTableTime =
    (req, res) => {
        res.send({
            name: "Ramy",
            email: "ramy@ramy",
            tableTime: 80
        })
    }

module.exports = {
    getStudents,
    getGrades,
    getTableTime
}