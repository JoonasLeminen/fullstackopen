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

test('a specific blog can de modified with status code 200', async () => {
  const blogToUpdate = {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 46,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toEqual(46)
})

test('a specific blog can be deleted with status code 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(b => b.title)

    expect(contents).not.toContain(blogToDelete.title)
})

afterAll(async () => {
  await mongoose.connection.close()
})