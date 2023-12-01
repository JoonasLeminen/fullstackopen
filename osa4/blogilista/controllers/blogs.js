const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    console.log(blog)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).end()
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter