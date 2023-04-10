require('dotenv').config();
const express = require('express');
const app = express();

//imports
const cors = require('cors')
const logger = require('./src/middlware/logger')
const MongoManager = require('./src/db/mongo-manager')
const userRoutes = require('./src/routes/user.Routes')
const postRoutes = require('./src/routes/post.Routes')
const commentRoutes = require('./src/routes/comment.Routes')


//middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json())
app.use(logger)

app.get('/hello', (req, res) => {
    res.status(200).json({msg: 'superfwiends 4ever'})
})



app.use('/api/v1/user', userRoutes)
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/comment', commentRoutes)


MongoManager.openMongoConnection();
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})