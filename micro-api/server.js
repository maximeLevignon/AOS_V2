const { Router } = require('express')
const express = require('express')
const contributionRouter = require('./contribution/contribution.router')
const userRouter = require('./user/user.router')
const authRouter = require('./auth/auth.router')
const cors = require('cors')
const bodyParser = require('body-parser')
const database = require('./database.js')
const app = express()
const port = 3002



app.use(bodyParser.json());
app.use(cors())
app.use('/contributions', contributionRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})