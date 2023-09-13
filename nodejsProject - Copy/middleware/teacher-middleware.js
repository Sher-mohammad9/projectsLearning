const teacherModel = require("../database/model/techerSchema.js")


async function userIdentification(req, res, next, mobileNumber) {
    const mobileNumbers = JSON.parse(mobileNumber);
    if (mobileNumbers.length > 0) {
        for (let mobile of mobileNumbers) {
            try {
                const teacher = await teacherModel.find({ "mobile": mobile });
                if (teacher.length === 0) {
                    resp.status(404).send(`Teacher not found given by mobile number ${mobile}`)
                } else if (teacher.length > 1) {
                    res.status(400).send(`More than one record found for the given student id.${mobile}`)
                }
            } catch (error) {
                resp.status(500).send(error.message);
            }
        }
        next();
    } else {
        teacherModel.find({ "mobile": mobileNumber })
            .then((teacher) => {
                if (teacher.length === 0) {
                    res.status(404).send("Student not found given by mobile number");
                } else if (teacher.length > 1) {
                    res.status(400).send("More than one record found for the given student id.")
                } else if (teacher.length === 1) {
                    next()
                } else {
                    res.status(500).send("Invalid Id")
                }
            })
    }
}

module.exports = userIdentification;  