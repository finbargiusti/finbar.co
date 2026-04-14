return E.compile([[
  <header>
    <title>{%= Title %}</title>
    <link rel="stylesheet" type="text/css" href="/style/main.css" />
    <!-- local style -->
    <link rel="stylesheet" type="text/css" href="{%= path or '' %}style.css" />
  </header>
]])
