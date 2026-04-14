local blogs = require('util.blogs')

for _, b in ipairs(blogs) do
  R.template('blog', {
    title = b.title,
    date = b.date,
    content = b.content
  }, '/blog/' .. b.slug)
end
