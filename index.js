const express = require('express');
const app = express();
const puppeteer = require('puppeteer-core');

app.use('/static', express.static('static'));

const executablePath = 'C:\\Users\\shuang\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe';
puppeteer.launch({ executablePath }).then((browser) => {
  app.use('/screenshot', async (req, res, next) => {
    const id = new Date().getTime();
    const startTime = new Date();
    const {url} = req.query;
    
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({
      path: './static/'+ id +'.png',
      clip: {
        x: 8,
        y: 8,
        width: 800,
        height: 400
      }
    });
    await page.close();
    const endTime = new Date();
    console.log('耗时', endTime - startTime, url);
    res.sendFile('./static/'+id+'.png', { root: __dirname })
  });
})

app.listen(8080, '0.0.0.0', () => {
  console.log('server up, listen 8080...');
});
