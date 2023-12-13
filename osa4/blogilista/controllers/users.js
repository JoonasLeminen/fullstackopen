const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (username.length < 3) {
    return response.status(400).json({ error: 'too short username' })
  } else if (username === undefined) {
    return response.status(400).json({ error: 'username undefined' })
  } else if (password.length < 3) {
    return response.status(400).json({ error: 'too short password' })
  } else if (password === undefined) {
    return response.status(400).json({ error: 'password undefined' })
  }
  const users = await User.find({})
  const usernamesTaken = users.map(u => u.username)
  if (usernamesTaken.includes(username)) {
    return response.status(400).json({ error: 'username already taken' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1 })

  response.json(users)
})

module.exports = usersRouter