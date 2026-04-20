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
  return content:match('%-%-%-\n.-' .. name .. '%s-:%s+([^\n]+).-%-%-%-')
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
