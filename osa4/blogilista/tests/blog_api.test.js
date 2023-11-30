const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  //console.log('alustetaan tietokanta')
  await Blog.insertMany(helper.initialBlogs)
  //console.log(helper.initialBlogs)
})

test('blogs are returnes as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('database contains right amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are identified by a string named id', async () => {
  const response = await api.get('/api/blogs')

  const contentsId = response.body.map(r => r.id)

  expect(contentsId).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Tietorakenne näyttää muuttuneen',
    author: 'JL',
    url: 'jopas.com',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).toContain('Tietorakenne näyttää muuttuneen')
})

afterAll(async () => {
  await mongoose.connection.close()
})