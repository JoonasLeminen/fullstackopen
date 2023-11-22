const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app