---@param env { content: table<number, string> }
return function(env)
  S:add('cards', [[
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40ch, 1fr));
  grid-auto-flow: row;
  grid-template-rows: repeat(2, auto);
  row-gap: 1.2rem;
  column-gap: 1.8ch;
  padding: 0.4rem 0.4ch 0.4rem 0.4ch;
}
.card {
  border-top: 0.2rem solid #F8F8F2;
  border-bottom: 0.2rem solid #F8F8F2;
  border-left: 0.2ch solid #F8F8F2;
  border-right: 0.2ch solid #F8F8F2;
  padding: 0.4rem 1.4ch 0.4rem 1.4ch;
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
