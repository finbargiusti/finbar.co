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

Elua exports a module with the following methods:

```lua
---@param input string
---@return function(env: table?): string
function M.compile(input) end


---@param input string
---@param env table?
---@return string
function M.render(input, env) end

---@param from string
---@param to string
---@param env table?
function M.render_file(from, to, env) end
```

`compile` returns a function that given an template, returns a function that
given a table `env` with the execution environment. The execution environment
inherits the globals of its caller and by default includes just the globals.

`render` just compiles and immediately runs the template with a given env.

`render_file` is a helper that reads the template from a file `from`, renders
it with execution context `env`, and saves the output to the the file `to`.

## Nuances

Elua is generally unsafe. Arbitrary lua code between either `{% %}` or `{%= %}`
will be executed.

For prettiness of outputs, any whitespace between non-printing blocks is
omitted from the output.

You can see [finbar.co](https://github.com/finbargiusti/finbar.co) as a
practical example of elua. It includes a basic templating / packaging and
component system in lua.

