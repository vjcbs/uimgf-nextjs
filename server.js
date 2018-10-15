const express = require('express')
const next = require('next')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/i/:id', (req, res) => {
    const actualPage = '/image'
    const context = {id: req.params.id}
    app.render(req, res, actualPage, context)
  })

  server.get('/result', (req, res) => {
    const actualPage = '/result'
    app.render(req, res, actualPage, req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:8000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
