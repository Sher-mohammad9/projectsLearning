const studentModel = require("../database/model/studentSchema.js")


async function userIdentification(req, resp, next, mobileNumbers) {
        const mobileNumber = JSON.parse(mobileNumbers);
        if (mobileNumber.length > 0) {
                for (let mobile of mobileNumber) {
                        try {
                                const findStudent = await studentModel.find({ "mobile": mobile });
                                if (findStudent.length === 0) {
                                        resp.status(404).send(`Student not found given by mobile number ${mobile}`)
                                } else if (findStudent.length > 1) {
                                        res.status(400).send(`More than one record found for the given student id.${mobile}`)
                                }
                        } catch (error) {
                                resp.status(500).send(error.message);
                        }
                }
                        next();
        } else {
                studentModel.find({ "mobile": mobileNumber })
                        .then((student) => {
                                if (student.length === 0) {
                                        resp.status(400).send("Student not found given by mobile number");
                                } else if (student.length > 1) {
                                        res.status(400).send("More than one record found for the given student id.")
                                } else if (student.length === 1) {
                                        next();
                                } else {
                                        resp.status(400).send("Invalid Id");
                                }
                        }, (error) => {
                                console.log(error);
                        })
        }
}

module.exports = userIdentification;