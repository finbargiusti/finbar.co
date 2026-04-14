os.execute('rm -rf dist/*')

R.template('main',
  {
    Title = "Finbar Giusti",
    content = require('content.home')
  }, '/')

require('pages')
require('blog')

R.mirror('static')
