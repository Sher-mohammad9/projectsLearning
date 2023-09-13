const studentModel = require("../database/model/studentSchema.js")

// GET student data
async function getStudentData(req, resp) {
      try {
            const student = await studentModel.find()
            if (student.length === 0) {
                  resp.status(200).send({ "data": "Database is empty" })
            } else {
                  resp.status(200).send(student);
            }
      } catch (error) {
            resp.status(500).send(error.message)
      }
};


// GET student data by mobile number and bulk
async function getStudentByMobile(req, resp) {
      const userMobile = req.url.split("/");
      const mobileNumbers = JSON.parse(userMobile[userMobile.length - 1])
      if (mobileNumbers.length > 0) {
            const studentResponse = [];
            for (let mobile of mobileNumbers) {
                  try {
                        const findStudent = await studentModel.find({ "mobile": mobile })
                        studentResponse.push(...findStudent)
                  } catch (error) {
                        resp.status(500).send(error.message)
                  }
            }
            resp.status(200).send(studentResponse)
      } else {
            const mobileNumber = +userMobile[userMobile.length - 1];
            try {
                  const student = await studentModel.find({ "mobile": mobileNumber })
                  resp.status(200).send(student);
            } catch (error) {
                  resp.status(500).send(error.message);
            }
      }
}

// Create student data
async function createStudent(req, resp) {
      const studentBody = req.body;
      if (studentBody.length > 0) {
            for (let student of studentBody) {
                  try {
                        const students = new studentModel(student);
                        await students.save();
                  } catch (error) {
                        resp.status(500).send(error.message)
                  }
            }
            resp.status(200).send("Create student bulk")
      } else {
            try {
                  await students.save();
                  resp.status(200).send("Create student")
            } catch (error) {
                  resp.status(500).send(error.message)
            }
      }

}



// UPDATE student data by mobile number
async function updateStudent(req, resp) {
      try {
            await studentModel.updateOne({ "mobile": req.body.mobile }, { $set: { "class": req.body.class } })
            resp.status(200).send("Successfully update")
      } catch (error) {
            resp.status(500).send(error.message);
      }
}


// delete student by mobile Number
async function deleteStudent(req, resp) {
      const userMobile = req.url.split("/");
      const mobileNumbers = JSON.parse(userMobile[userMobile.length - 1]);
      if (mobileNumbers.length > 0) {
            for (let mobile of mobileNumbers) {
                  try {
                        await studentModel.deleteOne({ "mobile": mobile });
                  } catch (error) {
                        resp.status(500).send(error.message);
                  }

            }
            resp.status(500).send("Delete student bulk");
      } else {
            const mobileNumber = +userMobile[userMobile.length - 1];
            try {
                  await studentModel.deleteOne({ "mobile": mobileNumber })
                  resp.status(200).send("Delete student");
            } catch (error) {
                  resp.status(500).send(error.message);
            }
      }
}

module.exports = {
      getStudentData,
      getStudentByMobile,
      createStudent,
      updateStudent,
      deleteStudent
}