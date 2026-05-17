import express, { type Application, type Request, type Response } from "express"
import { initDB, pool } from "./db";

const app: Application = express();
const port = 5000;

//middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));





app.get('/user', (req: Request, res: Response) => {
    //   res.send('Hello World!!!')
    res.status(200).json({
        "message": "Express Server",
        "author": "Maheer",
    })
})

app.post('/api/users', async (req: Request, res: Response) => {
    // console.log(req.body);
    try {
        const { name, email, password, age } = req.body;
        const result = await pool.query(`
        INSERT INTO users(name,email,password,age)
        VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, password, age])

        res.status(201).json({
            message: 'User created successfully',
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
})

// GET ALL USERS
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users      
            `)
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully!",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
})

// GET ONE USER
app.get('/api/users/:id', async (req: Request, res: Response) => {
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
            })
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
})

// UPDATE USER
app.put('/api/users/:id', async (req: Request, res: Response) => {
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
            })
        }
        res.status(200).json({
            success: true,
            message: "User updated succesfully!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
})

// DELETE USER
app.delete('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            DELETE FROM users WHERE id=$1 RETURNING *
            `, [id])
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            data: {}
        })
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {}
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
})

export default app