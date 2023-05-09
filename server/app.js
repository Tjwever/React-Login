require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { consoleLogger, logger } = require('./src/middleware/logger')
const errorHandler = require('./src/middleware/errorHandler')
const MongoManager = require('./src/db/mongo-manager')
const userRoutes = require('./src/routes/user.Routes')
const authRoutes = require('./src/routes/auth.Routes')
const corsOptions = require('./config/corsOptions')

//middleware
app.use(cors(corsOptions))

app.use(logger)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)

MongoManager.openMongoConnection()
app.use(errorHandler)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
