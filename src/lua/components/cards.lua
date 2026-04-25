---@param env { content: table<number, string> }
return function(env)
  S:add('cards', [[
.cards {
  display: grid;
  font-size: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(40ch, 1fr));
  grid-auto-flow: row;
  grid-template-rows: repeat(2, auto);
}
.card {
  border-top: 0.3rem solid #F8F8F2;
  border-bottom: 0.3rem solid #F8F8F2;
  border-left: 0.2ch solid #F8F8F2;
  border-right: 0.2ch solid #F8F8F2;
  padding: 0.6rem 1.4ch 0.6rem 1.4ch;
  margin: 0.6rem 0.4ch 0.6rem 0.4ch;
  display: inline-block;
}
  ]])

  return E.render([[
<div class="cards pinsize">
  {% for _, c in ipairs(content) do %}
  <div class="card">
    {%= c %}
  </div>
  {% end %}
</div>
  ]], env)
end
