const {
  pool
} = require('./pool')


const factory = {
  create: async () => {
    return await puppeteer.launch();
  },
  destroy: async (browser) => {
    await browser.close();
  }
}

const opts = {
  max: 2, // maximum size of the pool
  min: 1 // minimum size of the pool
}


const resourcePromise = pool.acquire();

exports.screenshot = async ({
  url,
  fullPage = false,
  quality = 80,
  timeout = 30,
  width = 1366,
  height = 768
}) => {

  if (typeof url == "undefined") return false;

  return resourcePromise
    .then(async (browser) => {
      const page = await browser.newPage();

      await page.goto(url, {
        waitUntil: 'load',
        // Remove the timeout
        timeout: timeout * 1000
      })
      await page.setViewport({
        width,
        height,
        deviceScaleFactor: 1
      })

      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight)
      })

      const screen = await page.screenshot({
        encoding: 'base64',
        fullPage: fullPage,
        quality,
        type: 'jpeg'
      })
      return screen
    })
}