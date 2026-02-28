import express from 'express'
import connectDB from './config/db.js'
import bcrypt from 'bcrypt'
import ejs from 'ejs'
import morgan from 'morgan'
import User from './models/User.js'


const PORT = process.env.PORT || 5000
const app = express()

connectDB();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))



app.get('/', (req, res) => {
    res.send('<h1> homepage </h1>')
})

app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard.ejs')
})



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})