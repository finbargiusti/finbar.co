---The book component has sections, a title and a TOC.

return function(env)
  local max_item_width = 1
  for _, s in ipairs(env.sections) do
    max_item_width = math.max(max_item_width, s.title:len())
  end
  S:add('book', E.render([[
.book {
  display: grid;
  grid-template: 1fr /
    max-content
    auto;
  grid-template-areas: "toc content";
  margin: auto;
  max-width: 100%;
}
.content {
  grid-area: content;
  font-size: 1rem;
  padding: 1.5rem 2ch 4.5rem 2ch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-x: scroll;
}
.content .title {
  margin-bottom: 0px;
}
.toc {
  grid-area: toc;
  padding-top: 1.5rem;
  background-color: #44475A;
}
.toc a {
  display: block;
  color: inherit;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0px 2ch 0px 2ch;
}
.toc a:hover {
  background-color: #54576A;
}
@media screen and (max-width: 100vh) {
  .book {
    grid-template: min-content auto / 1fr;
    grid-template-areas: "toc" "content";
  }
  .toc {
    padding-bottom: 1.4rem;
  }
  .content {
    padding-top: 1.5rem;
  }
}
  ]], {max_item_width = max_item_width}))
  return E.compile([[
<div class = "book">
  <div class = "toc">
    {% for i, section in ipairs(sections) do %}
    <a href="#{%= section.slug %}">{%= section.title %}</a>
    {% end %}
  </div>
  <div class="content">
    {% if title then %}
    <h1 class="title">{%= title %}</h1>
    <hr class="underline"/>
    {% end %}
    {% for i, section in ipairs(sections) do %}
    <div class="section" id="{%= section.slug or '' %}">
      {% if section.title then %}
      <h2>{%= section.title %}</h2>
      {% end %}
      {%= section.content %}
    </div>
    {% end %}
  </div>
</div>
]])(env)
end
