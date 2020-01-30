const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const [el] = await page.$x('//*[@id="search"]/div[1]/div[2]/div/span[4]/div[1]/div[4]/div/span/div/div/div/div[2]/div[1]/div/div/span/a/div/img');
  const src = await el.getProperty('src');
  const imgURL = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="search"]/div[1]/div[2]/div/span[4]/div[1]/div[4]/div/span/div/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/h2/a/span');
  const txt = await el2.getProperty('textContent');
  const title = await txt.jsonValue();

  const [el3] = await page.$x('//*[@id="search"]/div[1]/div[2]/div/span[4]/div[1]/div[4]/div/span/div/div/div/div[2]/div[2]/div/div[2]/div[1]/div/div[1]/div/div/a/span[1]/span[1]');
  const txt2 = await el3.getProperty('textContent');
  const price = await txt2.jsonValue();

  console.log({imgURL, title, price});

  browser.close();
}

scrapeProduct('https://www.amazon.in/s?k=hyper+x&i=computers&ref=nb_sb_noss_2');