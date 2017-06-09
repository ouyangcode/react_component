const express = require('express')
const rewrite = require('express-urlrewrite')
const app     = express()

const port = 9003



app.use(rewrite('/', '/index.html'))
app.use(express.static(__dirname + '/dist'))


app.listen(port, () => {
  console.log('app run at ' + port)
})
