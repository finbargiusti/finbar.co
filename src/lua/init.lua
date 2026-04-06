E = require('elua')
R = {}

---Render an elua template in src/templates
---@param template string path to template
---@param env table execution environment
---@param to_file string? (URL) path to render to. if nil, 
---returns the rendered template. (starts with /)
function R.template(template, env, to_file)
  -- templates end with .elua.html for conveniance
  local template_path = 'src/templates/' .. template .. '.elua.html'
  local t, err = io.open(template_path, 'r')
  if not t then
    error('templated could not be loaded: ' .. err)
  end
  local s = t:read('*all')
  t:close()
  local rendered = E.render(s, env)
  if to_file then
    local folder_path = 'dist/' .. (to_file:match("/(.+)") or "")
    os.execute('mkdir -p ' .. folder_path)
    local o, err = io.open(folder_path .. '/index.html', 'w')
    if not o then
      error('could not open outfile for writing: ' .. err)
    end
    o:write(rendered)
    o:close()
  else
    return rendered
  end
end

function R.mirror(frompath, topath)
  local from_path = 'src/' .. frompath
  local to_path   = 'dist/' .. (topath or '')

  -- Ensure the destination directory exists
  os.execute('mkdir -p "' .. to_path .. '"')

  -- Copy the contents of from_path into to_path
  local cmd = string.format('cp -r "%s/." "%s/"', from_path, to_path)
  local result = os.execute(cmd)

  if result ~= 0 then
    print(string.format("Failed to copy %s -> %s", from_path, to_path))
  end
end
