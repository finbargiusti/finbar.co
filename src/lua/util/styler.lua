---@class Styler
---@field path string
---@field styles table<string, string>
local Styler = {}
Styler.__index = Styler

---@param styles table<string, string>?
---@return Styler
function Styler.new(styles)
  local self = setmetatable({}, Styler)
  self.path = nil
  self.styles = styles or {}
  return self
end

---@param style string
---@return nil
function Styler:add(key, style)
  self.styles[key] = style
end

---@return nil
function Styler:write(path)
  local function get_style(k)
    local k_, value = next(self.styles, k)
    if not k_ then return end
    return value .. '\n' .. (get_style(k_) or '')
  end
  local text = get_style()
  local f = assert(io.open(path, 'w'))
  f:write(text)
  f:close()
end

function Styler:clear()
  self.styles = {}
end

return Styler
