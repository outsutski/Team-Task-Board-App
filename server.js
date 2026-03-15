import express from 'express'
import connectDB from './config/db.js'
import morgan from 'morgan'
import authRoutes from './src/routes/auth.js'
import boardRoutes from './src/routes/boards.js'
import taskRoutes from './src/routes/tasks.js'
import { protect } from './src/middleware/auth.js'


const PORT = process.env.PORT || 5000
const app = express()

connectDB();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))


app.use('/', authRoutes) 
app.use('/boards', boardRoutes)
app.use('/tasks', taskRoutes)



app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({ error: err.message || 'Server error' })
})


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})