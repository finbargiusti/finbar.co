---
window_title: Elua tutorial
---

# How to use Elua

Elua is the minimal lua templating language I have written. It is quite simple.

Templates look like this:

```html
<p>Numbers 1 to 4:</p>
<ol>
{% for i = 1,4 do %}
    <li>{%= i %}</li>
{% end %}
</ol>
```


