//sudo npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth puppeteer-extra-plugin-adblocker readline
var headless_mode = process.argv[2]

const readline = require('readline');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

var nr = 'During the diagnostic and trying several part the device seems to have a board issue. ';
var c = 'Called customer and updated them to pick the device up. ';
var vm = 'called and left a voicemail for the customer. ';
var wd = 'After further inspection the device has evidence of water damage and cannot warranty the repair. ';
var wn = 'Called customer but the number provider is not in service. ';
var dn = "number given to call is to the device that was repaired. "
var r =  'Device is ready for pick up. ';
var def = 'The replacement part was defective. Will try another one. ';
var t = 'tested ';
var d = 'customer declined repair. Ready for pick up. ';
var o = "ordering part ";


run(7112483, "called but number given is to device repaired");


async function run (tktNum, msg) {
  const browser = await puppeteer.launch({
    headless:(headless_mode !== 'true')? false : true,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    args: ['--window-size=1400,900',
    '--disable-gpu', "--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=true'
    ]})

  const page = await browser.newPage();


  console.log(`Loading page...`);
  await goto_Page('Your RepairQ login Link');

  await page.focus('#UserLoginForm_username')
  await page.keyboard.type('username');
  await page.keyboard.press("Tab");
  await page.keyboard.type('password');
  await page.keyboard.press("Enter");
  
  await page.waitFor(2000);

  
  page.waitForSelector('.quickSearch');
  await page.focus('.quickSearch');
  await page.keyboard.type(`${tktNum}`);
  await page.keyboard.press("Enter");

  await page.waitFor(3000);

  page.waitForSelector('.trigger-note-add');
  const elements = await page.$x('//*[@id="notes"]/div[2]/div/div[2]/div[1]/a');
  await elements[0].click();

  await page.waitFor(1000);

  await page.click('iframe'); 


  await page.keyboard.type(`${msg} -CPRbot`);
  


  await page.click('input.submit-button');

  console.log("success!");


  async function goto_Page(page_URL){
    try{
      await page.goto(page_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch {
      console.log(`Error in loading page, re-trying...`)
      await goto_Page(page_URL)
    }
  }

  await browser.close()
}