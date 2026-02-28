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

app.get('/login', (req, res) => {
    res.render('pages/login.ejs');
})

app.get('/register', (req, res) => {
    res.render('pages/register.ejs')
})

app.post('/register', async (req, res) => {
    try{
        const { username, email, password, confirm_password } = req.body

        if (password !== confirm_password) {
            return res.send("Passwords do not match.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();
        res.send("Registration successful! You can now log in.")
        console.log(hashedPassword)

    } catch(err){
        console.error(err)
        res.status(500).send("An error occurred during registration.")
    }
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})