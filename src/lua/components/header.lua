return E.compile([[
  <head>
    <title>{%= Title %}</title>
    <link rel="stylesheet" type="text/css" href="/style/main.css" />
    <!-- local style -->
    <link rel="stylesheet" type="text/css" href="{%= UPath or '' %}/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
]])
