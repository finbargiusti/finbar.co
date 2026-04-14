---@param env { content: table<number, string> }
return function(env)
  S:add('cards', [[
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  grid-auto-flow: row;
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
}
.card {
  border: 0.1rem solid white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  display: inline-block;
  box-sizing: border-box;
}
  ]])

  return E.render([[
<div class="cards">
  {% for _, c in ipairs(content) do %}
  <div class="card">
    {%= c %}
  </div>
  {% end %}
</div>
  ]], env)
end
