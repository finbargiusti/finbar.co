local cards = require('components.cards')

---@class Experience
---@field title string
---@field company string
---@field from string
---@field to string
---@field description string?
---@field keywords table<number, string>?

---@param env table<number, Experience>
return function(env)
  S:add('experience', [[
.experience {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.experience .title {
  margin: 0.2rem 0px 0.2rem 0px;
  font-size: 1.5rem;
  color: #eee;
}
.experience .company {
  margin: 0px 0px 0.2rem 0px;
  text-transform: uppercase;
  font-weight: bold;
  color: #ccc;
}
.experience .time {
  margin: 0px;
  color: #aaa;
}
.experience .description {
  flex-grow: 1;
}
.experience .keywords {
  display: flex;
  text-transform: uppercase;
  flex-direction: row;
  font-size: 0.8rem;
  gap: 0.3rem;
  flex-wrap: wrap;
  color: #ccc;
  line-height: 1rem;
}
.experience .keywords > span {
  margin: 0px 0.2rem 0px 0px;
}
  ]])

  local content = {}

  local template = E.compile [[
<div class="experience">
  <h4 class="title">{%= title %}</h4>
  <p class="company">{%= company %}</p>
  <p class="time">{%= from %} - {%= to %}</p>
  <div class="description">{%= description or '' %}</div>
  <p class="keywords">
  {% if keywords then %}
  {% for _, c in ipairs(keywords) do %}
    <span>{%= c %}</span>
  {% end %}
  {% end %}
  </p>
</div>
  ]]

  for _, e in ipairs(env) do
    content[# content+1] = template(e)
  end

  return cards({content = content})
end
