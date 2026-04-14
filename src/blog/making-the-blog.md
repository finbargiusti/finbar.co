---
title: Making the blog
date: 2026-04-14
---

This is the first entry in my blog. I will discuss how I added a blog to my
site using lua. In the end I was able to add a blog summary on my home page as
well as individual blog entry pages in just a few lines of code.

Let's go through how it works.

First, I made a directory `src/blog/` that will contain markdown files for each
of my blog entries.

Then, I added a lua file `src/lua/util/blogs.lua` which reads each blog file, parses it 
and returns each blog a well-typed table for use.

```lua
-- src/lua/util/blogs.lua
local blog_sources = io.popen('find src/blog/ -type f -name "*.md"', 'r')

if not blog_sources then
  return {}
end

---@alias BlogData { slug: string, content: string, title: string, date: string, summary: string}

---@type BlogData[]
local blogs = {}

---Gets a frontmatter string yaml value from a markdown file.
---@param content string
---@param name string
---@return string
local function fm_val(content, name)
  return content:match('%-%-%-\n.-' .. name .. '%s-:([^\n]+).-%-%-%-')
end

for path in blog_sources:lines() do
  local slug = path:match('src/blog/(.-)%.md')
  local content = io.open(path):read('*all')
  local title = fm_val(content, 'title')
  -- ASSUMED format yyyy-mm-dd
  local date = fm_val(content, 'date')
  -- the summary is the first cohesive text block
  local summary =
      content:match(
        '^%-%-%-[%s%S]-%-%-%-([\n%s]*%S[%s%S]-)\n%s*\n'
      )
      or content:match('^%-%-%-[%s%S]-%-%-%-([%s%S]*)$')
  blogs[#blogs + 1] = {
    slug = slug,
    content = content,
    title = title,
    date = date,
    summary = summary
  }
end

blog_sources:close()

-- sort by date in descending order
table.sort(blogs, function(a, b)
  return a.date > b.date
end)

return blogs
```

I added a basic template, and using a function I defined that depends on
[elua](/elua), render each blog with the template.

```lua
local blogs = require('util.blogs')

for _, b in ipairs(blogs) do
  R.template('blog', {
    title = b.title,
    date = b.date,
    content = b.content
  }, '/blog/' .. b.slug)
end
```

Finally, in my front page, I used a reusable card component to display
the 4 latest blog entries, their summaries, and a link to the blog post.

```lua
-- src/lua/content/home.lua (in the content table)
  {
    title = "Blog",
    slug = "blog",
    content = [[
      <p>Recent entries from my blog:</p>
]] .. cards({
      content = table.map(blogs, function(i, b)
        if i > 4 then
          return i, nil
        end
        return i, E.render([[
          <h3>{%= title %}</h3>
          <h4>{%= date %}</h4>
          <p>{%= summary %}</h4>
          <p><a href="/blog/{%= slug %}">Read more</a></p>
]], b)
      end)
    })
  },
```
