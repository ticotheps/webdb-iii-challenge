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
    // retrieves all records from the cohorts table
    db("cohorts")
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get("/:id", (req, res) => {
    const cohortId = req.params.id; // this is the same thing as the desctructured version: 'const { id } = req.params'; 

    // retrieves a specified cohort by its id
    db("cohorts")
        .where({ id: cohortId })
        .first() // this makes sure to ONLY return the FIRST matching element found
        .then(cohort => {
            res.status(200).json(cohort);
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

router.post("/", (req, res) => {
    db("cohorts")
        .insert(req.body)
        .then(ids => {
            const id = ids[0];

            db("cohorts")
                .where({ id })
                .first()
                .then(cohort => {
                    res.status(201).json(cohort);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.put("/:id", (req, res) => {
    db("cohorts")
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: "Specified cohort was not found" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;