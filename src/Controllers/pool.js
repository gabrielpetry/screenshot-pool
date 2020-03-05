const genericPool = require('generic-pool')
const puppeteer = require('puppeteer')


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
 
exports.pool = genericPool.createPool(factory, opts)
