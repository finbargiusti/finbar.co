local page_sources = io.popen('find src/pages/ -type f -name "*.md"', 'r'):lines()

---@alias PageData { slug: string, content: string, window_title: string }

---@param path string
---@return PageData
local function get_page_data(path)
  local slug = path:match('src/pages/(.-)%.md')
  local content = io.open(path):read('*all')
  local window_title = content:match('%-%-%-\n.-window_title:([^\n]+).-%-%-%-') or slug

  return {
    slug = slug,
    content = content,
    window_title = window_title:match('^%s+(.-)$')
  }
end

for p in page_sources do
  local page_data = get_page_data(p)

  R.template('page', {
    title = page_data.window_title,
    slug = page_data.slug,
    content = page_data.content
  }, '/' .. page_data.slug)
end
