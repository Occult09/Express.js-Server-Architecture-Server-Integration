import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

//middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoute)



app.get('/user', (req: Request, res: Response) => {
    //   res.send('Hello World!!!')
    res.status(200).json({
        "message": "Express Server",
        "author": "Maheer",
    })
})

export default app