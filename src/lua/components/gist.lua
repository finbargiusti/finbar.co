return E.compile([[
  <div class="gist">
    {% for _, t in ipairs(text) do %}
      <p>
        {%= t %}
      </p>
    {% end %}
  </div>
]])
