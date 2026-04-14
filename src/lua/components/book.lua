---The book component has sections, a title and a TOC.

return function(env)
  S:add('book', [[
.book {
  display: grid;
  grid-template: 1fr /
    16rem
    minmax(min-content, 64rem)
    auto;
  grid-template-areas: "toc content .";
  margin: auto;

  max-width: 96rem;
}
@media screen and (max-width: 48rem) {
  .book {
    grid-template: min-content auto / 1fr;
    grid-template-areas: "toc" "content";
  }
}
.content {
  grid-area: content;
  display: relative;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box
}
.toc {
  padding-top: 2rem;
  grid-area: toc;
}
.toc a {
  display: block;
  color: white;
  background-color: #333;
  margin: none;
  padding: none;
  box-sizing: border-box;
  padding: 8px 16px 8px 16px;
}
.toc a:hover {
  background-color: #444;
}
.toc .wrap {
  border-right: 2px #eee solid;
}
  ]])
  return E.compile([[
<div class = "book">
  <div class = "toc">
    <div class = "wrap">
      {% for i, section in ipairs(sections) do %}
      <a href="#{%= section.slug %}">{%= section.title %}</a>
      {% end %}
    </div>
  </div>
  <div class="content">
    {% if title then %}
    <h1>{%= title %}</h1>
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
