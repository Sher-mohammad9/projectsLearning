const teacherModel = require("../database/model/techerSchema.js");
const model = require("../database/model/techerSchema.js")

//GET teacher data by mobile number bulk
async function getTeacherByMobile(req, resp) {
    const userMobile = req.url.split("/");
    const mobileNumbers = JSON.parse(userMobile[userMobile.length - 1]);
    if (mobileNumbers.length > 0) {
        let response = [];
        for (let mobile of mobileNumbers) {
            try {
                const teacher = await teacherModel.find({ "mobile": mobile });
                response.push(...teacher);
            } catch (error) {
                resp.status(500).send(error.message)
            }
        }
        resp.status(200).send(response);
    } else {
        const mobile = +userMobile[userMobile.length - 1];
        try {
            const teacher = await teacherModel.find({ "mobile": mobile })
            resp.status(200).send(teacher);
        } catch (error) {
            resp.status(500).send(error.message);
        }
    }
}

// GET all teacher data
async function getAllTeacher(req, resp) {
    try {
        const teacher = await teacherModel.find();
        if (teacher.length === 0) {
            resp.status(200).send({ "data": "Database is empty" })
        } else {
            resp.status(200).send(teacher[0]);
        }
    } catch (error) {
        resp.status(500).send(error.message);
    }
}

// Create teacher data
async function createTeacher(req, resp) {
    const reqBody = req.body;
    if (reqBody.length > 0) {
        for (let teacher of reqBody) {
            try {
                const createTeacher = new teacherModel(teacher);
                await createTeacher.save();
            } catch (error) {
                resp.status(500).send(error.message);
            }
        }
        resp.status(200).send("Create student bulk");
    } else {
        try {
            const teacher = new teacherModel(reqBody)
            await teacher.save()
            resp.status(200).send("Create teacher");
        } catch (error) {
            resp.status(500).send(error.message);
        }
    }
}

// UPDATE teacher data by Id and Bulk
async function updateTeacher(req, resp) {
    try {
        await teacherModel.updateOne({ "mobile": req.body.mobile }, { $set: { "address": req.body.address } })
        resp.status(200).send("Successfully update")
    } catch (error) {
        resp.status(500).send(error.message)
    }
}

// delete student by id and bulk
async function deleteTeacher(req, resp) {
    const userMobile = req.url.split("/");
    const mobileNumbers = JSON.parse(userMobile[userMobile.length - 1]);
    if (mobileNumbers.length > 0) {
        for (let mobile of mobileNumbers) {
            try {
                await teacherModel.deleteOne({ "mobile": mobile });
            } catch (error) {
                resp.status(500).send(error.message);
            }
        }
        resp.status(200).send("Delete student bulk")
    } else {
        const mobile = +userMobile[userMobile.length - 1]
        try {
            await teacherModel.deleteOne({ "mobile": mobile })
            resp.status(200).send("Delete teacher");
        } catch {
            resp.status(500).send(error.message);
        }
    }
}
module.exports = {
    getTeacherByMobile,
    getAllTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher
}