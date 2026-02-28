import express from 'express'
import connectDB from './config/db.js'
import ejs from 'ejs'
import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import { protect } from './src/middleware/auth.js'


const PORT = process.env.PORT || 5000
const app = express()

connectDB();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use('/', authRoutes)


app.get('/', (req, res) => {
    res.send('<h1> homepage </h1>')
})

app.get('/dashboard', (req, res) => {
    res.send('<h1> Dashboard </h1>')
})

// app.get('/dashboard', protect, (req, res) => { ... })

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})