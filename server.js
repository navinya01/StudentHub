const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// =====================================
// MYSQL CONNECTION
// =====================================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQL@1234",
    database: "student_productivity"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
    } else {
        console.log("MySQL connected successfully!");
    }
});


// =====================================
// HOME
// =====================================

app.get("/", (req, res) => {
    res.send("Backend server is running!");
});


// =====================================
// TEST DATABASE
// =====================================

app.get("/test-db", (req, res) => {

    db.query("SELECT 1 AS test", (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database connection failed",
                error: err.message
            });
        }

        res.json({
            success: true,
            message: "Database connected successfully!",
            result: result
        });

    });

});


// =====================================
// REGISTER
// =====================================

app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }

    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (results.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        try {

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql = `
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(
                insertSql,
                [name, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Registration failed",
                            error: err.message
                        });
                    }

                    res.json({
                        success: true,
                        message: "Registration successful!",
                        user: {
                            id: result.insertId,
                            name: name,
                            email: email
                        }
                    });

                }
            );

        } catch (error) {

            res.status(500).json({
                success: false,
                message: "Password encryption failed"
            });

        }

    });

});


// =====================================
// LOGIN
// =====================================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password"
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        try {

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            res.json({
                success: true,
                message: "Login successful!",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: "Login failed"
            });

        }

    });

});


// =====================================
// ADD STUDENT
// =====================================

app.post("/students", (req, res) => {

    const { name, email, roll_no } = req.body;

    const sql = `
        INSERT INTO students (name, email, roll_no)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, roll_no], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Student could not be added",
                error: err.message
            });
        }

        res.json({
            success: true,
            message: "Student added successfully!",
            student_id: result.insertId
        });

    });

});


// =====================================
// GET STUDENTS
// =====================================

app.get("/students", (req, res) => {

    db.query(
        "SELECT * FROM students ORDER BY id DESC",
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Could not fetch students",
                    error: err.message
                });
            }

            res.json({
                success: true,
                students: result
            });

        }
    );

});


// =====================================
// ADD RESULT
// =====================================

app.post("/results", (req, res) => {

    const {
        student_id,
        subject,
        marks,
        total_marks
    } = req.body;

    const sql = `
        INSERT INTO results
        (student_id, subject, marks, total_marks)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            student_id,
            subject,
            marks,
            total_marks || 100
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Result could not be added",
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Result added successfully!",
                result_id: result.insertId
            });

        }
    );

});


// =====================================
// GET RESULTS BY STUDENT
// =====================================

app.get("/results/:studentId", (req, res) => {

    const studentId = req.params.studentId;

    const sql = `
        SELECT *
        FROM results
        WHERE student_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [studentId], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Could not fetch results",
                error: err.message
            });
        }

        res.json({
            success: true,
            results: result
        });

    });

});


// =====================================
// GET ALL RESULTS
// =====================================

app.get("/results", (req, res) => {

    const sql = `
        SELECT
            results.id,
            results.student_id,
            students.name,
            students.roll_no,
            results.subject,
            results.marks,
            results.total_marks,
            results.created_at
        FROM results
        JOIN students
        ON results.student_id = students.id
        ORDER BY results.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Could not fetch results",
                error: err.message
            });
        }

        res.json({
            success: true,
            results: result
        });

    });

});


// =====================================
// ADD HABIT
// =====================================

app.post("/habits", (req, res) => {

    const {
        student_id,
        habit_name
    } = req.body;

    const sql = `
        INSERT INTO habits
        (student_id, habit_name)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [student_id, habit_name],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Habit could not be added",
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Habit added successfully!",
                habit_id: result.insertId
            });

        }
    );

});


// =====================================
// GET HABITS
// =====================================

app.get("/habits", (req, res) => {

    const sql = `
        SELECT
            habits.id,
            habits.student_id,
            students.name,
            students.roll_no,
            habits.habit_name,
            habits.completed,
            habits.habit_date
        FROM habits
        JOIN students
        ON habits.student_id = students.id
        ORDER BY habits.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Could not fetch habits",
                error: err.message
            });
        }

        res.json({
            success: true,
            habits: result
        });

    });

});


// =====================================
// UPDATE HABIT STATUS
// =====================================

app.put("/habits/:id", (req, res) => {

    const habitId = req.params.id;
    const { completed } = req.body;

    const sql = `
        UPDATE habits
        SET completed = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [completed, habitId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Habit status could not be updated",
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Habit status updated successfully!"
            });

        }
    );

});


// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});