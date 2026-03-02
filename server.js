import express from 'express'
import connectDB from './config/db.js'
import morgan from 'morgan'
import authRoutes from './src/routes/auth.js'
import { protect } from './src/middleware/auth.js'


const PORT = process.env.PORT || 5000
const app = express()

connectDB();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use('/', authRoutes) 


app.get('/', (req, res) => {
    res.send('<h1> homepage </h1>')
})


app.get('/dashboard', protect, (req, res) => {
    res.send('<h1> Dashboard </h1>')
  })

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})