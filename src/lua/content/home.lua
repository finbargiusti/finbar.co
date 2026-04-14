local book = require('components.book')
local md = require('components.markdown')
local experience = require('components.experience')
local cards = require('components.cards')
local blogs = require('util.blogs')

return book {
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
      title = "Blog",
      slug = "blog",
      content = md [[
Recent entries from my blog:
]] .. cards({
        content = table.map(blogs, function(i, b)
          if i > 4 then
            return i, nil
          end
          return i, E.render([[
<h3>{%= title %}&nbsp;|&nbsp;{%= date %}</h3>
<p>{%= summary %}</h4>
<p><a href="/blog/{%= slug %}">Read more</a></p>
]], b)
        end)
      })
    },
    {
      title = "Work Experience",
      slug = "work-experience",
      content = experience(require('content.experience'))
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
