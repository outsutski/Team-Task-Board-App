import express from "express";
import bcrypt from 'bcrypt'
import User from '../models/User.js'

const router = express.Router()


router.get('/login', (req, res) => {
    res.send('<h1>Login page</h1>');
})

router.post('/login', async (req, res) => {
    const {email, paqssword} = req.body
    try{

        const user = await User.findOne({ email: email })
        const isMatch = await bcrypt.compare(password, user.password )
        if (!user || !isMatch){
            return res.status(401).json({ message: 'Invalid credentials' })    
        }

        // res.status(200).json({ message: "Login successful", userId: user._id })
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token: token
    });

    }catch{
        console.error(err)
        res.status(500).send("An error occurred during login.")
    }
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

        const existing = await User.findOne({
            $or: [{ email }, { username }]
            })
            if (existing) {
            return res.status(400).send('Email or username already in use.')
            }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })


        await newUser.save();
        res.send("Registration successful! You can now log in.")

    } catch(err){
        console.error(err)
        res.status(500).send("An error occurred during registration.")
    }
})


export default router