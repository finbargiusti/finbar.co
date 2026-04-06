local gist = require('components.gist')
local md = require('components.markdown')
local book = require('components.book')

-- statics

os.execute('rm -rf dist/*')

R.template('main',
  {
    Title = "Finbar Giusti",
    content = book {
      title = "Finbar Giusti",
      sections = {
        {
          title = "About me",
          slug = "about-me",
          content = md [[
I am a **software engineer**, currently working at **Stripe**.

I like working with **high-velocity**, **complex** systems.

If you'd like to talk, **send me an email** at finbar(at)finbar.co.
]]
        },
        {
          title = "Work Experience",
          slug = "work-experience",
          content = E.render([[
<div class="experience">
  {% for _, e in ipairs(experience) do %}
    <div class="item">
      <b>{%= e.name %}</b>
    </div>
  {% end %}
</div>
]], {
              experience = {
                {
                  name = "Stripe"
                }
              }
            }
          )
        },
        {
          title = "About this site",
          slug = "about-this-site",
          content = md [[
This site was written using lua. This was not for conveniance or required features. Rather I was on PTO for a week and I thought it would be fun.

I did not use any LLMs in building it.

It works using a minimal lua templating language I built called [elua](https://github.com/finbargiusti/elua). It is easy and fast, but generally unsafe, and is not recommended for use.

I wrote some basic instructions for how to use elua [here](/elua).

You can see the source of this website on github [here](https://github.com/finbargiusti/finbar.co).
]]
        }
      }
    }
  }, '/')

require('pages')

R.mirror('static')
