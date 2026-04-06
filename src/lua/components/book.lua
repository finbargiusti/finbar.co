---The book component has sections, a title and a TOC.
return E.compile [[
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
]]
