const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "./data/lambda.sqlite3",
    },
    debug: true
};

const db = knex(knexConfig);

router.get("/", (req, res) => {

    // retrieves all student records from the 'students' table
    db("students")
        .then(students => {
            res.status(200).json(students);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get("/:id", (req, res) => {
    const studentId = req.params.id; // this is the same thing as the desctructured version: 'const { id } = req.params'; 

    // retrieves a particular student record (specified by student id)
    db("students")
        .innerJoin("cohorts", "cohorts.id", "students.cohort_id")
        .select({
            id: "students.id",
            studentName: "students.name",
            cohort: "cohorts.name"
        })
        .where({ "cohorts.id": studentId })
        .first() // this makes sure to ONLY return the FIRST matching element found
        .then(student => {
            res.status(200).json(student);
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

router.post("/", (req, res) => {

    // inserts a new student record into the 'students' table
    db("students")
        .insert(req.body)
        .then(ids => {
            const id = ids[0];

            db("students")
                .where({ id })
                .first()
                .then(student => {
                    res.status(201).json(student);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.put("/:id", (req, res) => {

    // updates a particular student record (specified by student id) in the 'students' table
    db("students")
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: "Specified student was not found" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete("/:id", (req, res) => {

    // deletes a particular student record (specified by student id) in the 'students' table
    db("students")
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "Specified student could not be found" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

module.exports = router;