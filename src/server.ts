import express, { type Application, type Request, type Response } from "express"
import {Pool} from 'pg'
const app: Application = express();
const port = 5000;

//middleware
app.use(express.json()); 
app.use(express.text());
app.use(express.urlencoded({extended: true}));


const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_ksmiz6rq9Iep@ep-wandering-waterfall-ap58op8f.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"
})

app.get('/user', (req: Request, res: Response) => {
//   res.send('Hello World!!!')
    res.status(200).json({
        "message":"Express Server",
        "author":"Maheer",
    })
})

app.post('/', async(req: Request, res: Response)=>{
    // console.log(req.body);
    const {name,course,password} = req.body;
    res.status(201).json({
        message: 'Created',
        data: {
            name,course
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
