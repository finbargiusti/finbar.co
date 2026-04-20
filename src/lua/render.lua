os.execute('rm -rf dist/*')

R.template('main',
  function()
    return {
      Title = "Finbar Giusti",
      content = require('content.home')()
    }
  end, '/')

require('pages')
require('blog')

R.mirror('static')
