import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes'
import cookieSession from 'cookie-session'
dotenv.config()

// Start Server
const app = express()

// Middleware
const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error('Missing Cookie Keys')
}
app.use(cookieSession({
    name: 'session',
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 5 * 60 * 1000
}))
app.use(cors({
    origin: ['http://localhost:4321', 'http://localhost:4500'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', userRouter)

// 404
app.use((req: Request, res: Response) => {
    res.status(404).send('Page not found')
})

// Run server
const PORT = process.env.PORT || 3500
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
