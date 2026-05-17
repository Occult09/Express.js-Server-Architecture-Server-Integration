import express, {} from "express";
import { Pool } from 'pg';
import config from "./config";
const app = express();
const port = 5000;
//middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
const pool = new Pool({
    connectionString: config.connection_string
});
const initDB = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(150),
                email VARCHAR(150) UNIQUE NOT NULL,
                password VARCHAR(150) NOT NULL,
                is_active BOOLEAN DEFAULT true,
                age INT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );`);
        console.log("Database connected successfully!");
    }
    catch (error) {
        console.log(error);
    }
};
initDB();
app.get('/user', (req, res) => {
    //   res.send('Hello World!!!')
    res.status(200).json({
        "message": "Express Server",
        "author": "Maheer",
    });
});
app.post('/api/users', async (req, res) => {
    // console.log(req.body);
    try {
        const { name, email, password, age } = req.body;
        const result = await pool.query(`
        INSERT INTO users(name,email,password,age)
        VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, password, age]);
        res.status(201).json({
            message: 'User created successfully',
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
});
// GET ALL USERS
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users      
            `);
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully!",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
});
// GET ONE USER
app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "No user found!",
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully!",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
});
// UPDATE USER
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, password, is_active, age } = req.body;
    try {
        const result = await pool.query(`
        UPDATE users SET name=COALESCE($1,name),password=COALESCE($2,password),is_active=COALESCE($3,is_active),age=COALESCE($4,age) WHERE id=$5 RETURNING *
        `, [name, password, is_active, age, id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
                data: {}
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated succesfully!",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
});
// DELETE USER
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            DELETE FROM users WHERE id=$1 RETURNING *
            `, [id]);
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            data: {}
        });
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {}
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=server.js.map