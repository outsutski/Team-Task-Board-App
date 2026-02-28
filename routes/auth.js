import express from "express";
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const router = express.Router()


router.get('/login', (req, res) => {
    res.render('pages/login.ejs');
})

router.get('/register', (req, res) => {
    res.render('pages/register.ejs')
})

router.post('/register', async (req, res) => {
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

        const existing = await User.findOne({
            $or: [{ email }, { username }]
            })
            if (existing) {
            return res.status(400).send('Email or username already in use.')
            }


        await newUser.save();
        res.send("Registration successful! You can now log in.")

    } catch(err){
        console.error(err)
        res.status(500).send("An error occurred during registration.")
    }
})


export default router