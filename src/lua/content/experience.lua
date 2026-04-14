local md = require('components.markdown')

return {
  {
    title = "Software Engineer",
    company = "Stripe",
    to = "present",
    from = "August 2025",
    description = md [[
Worked in the Authentication team at Stripe, handling payments performance optimization from the POV of 3DS.
This involves optimizing the boundaries between regulatory compliance, payment conversion, user experience and
latency.

Notably, I shipped an internal optimization saving **~$2M** in transaction fees yearly. I was also largely
involved in shipping [Standalone 3DS](https://docs.stripe.com/payments/3d-secure/standalone-three-d-secure),
for example single-handedly building the Analytics Dashboard, the Stripe.js sdk for users, as well as the
future payment 3DS setup.

Also worked on many impactful projects I cannot disclose.
]],
    keywords = {
      "payments",
      "finance",
      "machine learning",
      "high assurance engineering",
      "PCI compliance",
      "ruby",
      "java",
      "typescript",
      "gocode",
      "data engineering"
    }
  },
  {
    title = "Software Engineer Intern",
    company = "Stripe",
    to = "September 2024",
    from = "March 2024",
    description = md [[
Worked in the Authentication team on a couple of impactful projects I cannot disclose. I _can_ disclose that these changes positively impact >20M transactions per year as well as protecting Stripe from regulatory changes in the future.
                ]],
    keywords = {
      "payments",
      "machine learning",
      "high assurance engineering",
      "PCI compliance",
      "ruby",
      "gocode",
    }
  },
  {
    title = "Freelance Developer",
    company = "Self-Employed",
    description = md [[
I've been a Freelance developer / indie hacker as long as I can remember. See [my projects](#projects) below to see some of the things I worked on that are publically accessible.
                ]],
    to = "Can't stop",
    from = "Since forever",
    keywords = {
      "whatever I can get my hands on",
    }
  }
}
