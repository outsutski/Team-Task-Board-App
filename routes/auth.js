// import express from 'express'
// import jwt from 'jsonwebtoken'

// const app = express()

// app.use(express.json())


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


