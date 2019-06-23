const express = require('express');
const app = express();
const puppeteer = require('puppeteer-core');

app.use('/static', express.static('static'));

app.use('/screenshot', async (req, res, next) =>{
  const id = new Date().getTime();
  const startTime = new Date();
  const {url} = req.query;
  const browser = await puppeteer.launch({executablePath: 'C:\\Users\\shuang\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe'});
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({path: './static/'+ id +'.png'});
  await page.close();
  const endTime = new Date();
  console.log('耗时', endTime - startTime, url);
  res.sendFile('./static/'+id+'.png', { root: __dirname })
});

app.listen(8080, '0.0.0.0');