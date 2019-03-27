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

    // retrieves a specified cohort by its id
    db("students")
        .where({ id: studentId })
        .first() // this makes sure to ONLY return the FIRST matching element found
        .then(student => {
            res.status(200).json(student);
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

router.post("/", (req, res) => {
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

module.exports = router;