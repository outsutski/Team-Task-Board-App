import User from '../models/User.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{

        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ error: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.passwordHash)
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

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

    }catch(err){
        console.error(err)
        res.status(500).send("An error occurred during login.")
    }
}

const registerUser = async (req, res) => {
    try{
        const { username, email, password, confirm_password} = req.body

        if (password !== confirm_password) {
            return res.json({ error: "Passwords do not match." })
        }

        const existing = await User.findOne({
            $or: [{ email }, { username }]
            })
            if (existing) {
            return res.status(400).json({ error: 'Email or username already in use.' })
            }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            passwordHash: hashedPassword
        })


        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' })

    } catch(err){
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
}

export default {registerUser, loginUser}