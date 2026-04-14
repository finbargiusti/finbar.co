local function render(md)
  local output = os.tmpname()

  local input = assert(io.popen('pandoc --highlight-style=pygments --embed-resources -t html -o ' .. output, 'w'))
  input:write(md)
  input:close()

  -- now we pull the result from the tmpfile

  local result = assert(io.open(output, 'r'))

  local t = result:read('*all')
  result:close()
  return t
end

return function(text)
  return render(text)
end
