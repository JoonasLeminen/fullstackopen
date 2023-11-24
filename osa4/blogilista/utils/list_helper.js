const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  return Math.max.apply(null, blogs.map(blog => blog.likes))
}

const favoriteBlog = (blogs) => {
  const reducer = (most, current) => {
    return most.likes > current.likes ? most : current
  }
  return blogs.length === 0 ? undefined : blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  favoriteBlog
}