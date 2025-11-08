import express from "express"
import 'dotenv/config'
import cors from 'cors'
import morgan from "morgan"
import router from './src/routes/index.js'
import { connectToDB } from './src/libs/db.js'
import cookieParser from "cookie-parser"

const PORT = process.env.PORT

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', "POST", "DELETE", "PUT"],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser("secret"))

app.use('/api/v1', router)


app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(500).json({
        message: "Internal server error"
    })
})

// error middleware 
app.use((req, res) => {
    return res.status(404).json({
        message: "Not found."
    })
})


app.listen(PORT, async () => {
    console.log("Server is running at https://localhost:" + PORT)
    connectToDB()
})