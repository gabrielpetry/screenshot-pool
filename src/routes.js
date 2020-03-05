const express = require('express')
const os = require('os')
const {
  screenshot
} = require('./Controllers/screenshot')
const routes = express.Router()

routes.get('/', (req, res) => {
  res.json({
    ok: true,
    nodeId: os.hostname()
  })
})

routes.get('/screenshot', async (req, res) => {

  let url = req.query.url
  let fullPage = req.query.fullPage
  let quality = req.query.quality
  let width = req.query.w
  let height = req.query.h
  let timeout = req.query.timeout

  if (timeout > 30 || timeout < 1) timeout = 10

  console.log('received request', url)
  const screen = Buffer.from(
    await screenshot({
      url,
      fullPage,
      quality,
      width,
      height,
      timeout
    }),
    'base64'
  )
  // respond with image
  res.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Content-Length': screen.length
  })
  res.end(screen)

  // res.send({ok: true})

})


module.exports = routes