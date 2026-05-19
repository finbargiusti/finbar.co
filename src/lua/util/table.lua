local T = {}

function T.merge(a, b) 
  local new = {}
  for k, v in pairs(a) do
    new[k] = v
  end
  for k, v in pairs(b) do
    new[k] = v
  end
  return new
end

return T
