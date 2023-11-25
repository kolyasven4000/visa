import { sleep } from './utils.js'
import { sendToBot } from './bot.js'
/*import Imap from 'imap'
import inspect from 'util'
/workspace/.cache/puppeteer/chrome/linux-119.0.6045.105$ 
/workspace/.cache/puppeteer/chrome/linux-119.0.6045.105/chrome-linux64/chrome: error while loading shared libraries: libatk-1.0.so.0: cannot open shared object file: No such file or directory
*/
 import imaps from 'imap-simple'
 import {simpleParser} from 'mailparser'

import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const getBrowser = async () => {
  console.log(333)
  setInterval(() => {}, 100000)
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()
  await page.goto('https://telegra.ph/Navigaciya-po-kanalu-04-17', { 
    waitUntil: 'networkidle2', timeout: 15000
  })
  const content = await page.content()
  console.log(content)
}
getBrowser()

let searchFailed = false

const fetchVisa = async () => {
  let setCookie = process.env.COOKIE_VALUE
  sendToBot("Ищу слоты")
  const getData = () => {
    fetch("https://blsspain-russia.com/moscow/appointment.php", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,ro;q=0.6",
        "cache-control": "no-cache",
        "Cookie": `_ga=GA1.1.1166724266.1697792947; PHPSESSID=${setCookie}; _ga_TMNRH3PRZJ=GS1.1.1697792947.1.1.1697793621.0.0.0`,
        "pragma": "no-cache",
        "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://blsspain-russia.com/moscow/book_appointment.php",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then(r => {
      setCookie = r.headers.get("set-cookie").match(/=(.+?);/i)[1]
      return r.text()
    }).then(async r => {
      if (r.length < 100 && !searchFailed) {
        sendToBot("Поиск приостановлен")
        searchFailed = true
      }
      const [, availableDates] = r.match(/var available_dates.+\[(.+?)\]/i) || []
      console.log(availableDates)
      if (availableDates) {
        sendToBot(availableDates)
      } else {
        console.log(new Date().toLocaleTimeString())
        await sleep(300000)
        getData()
      }
    })
  }
  getData()
}
//fetchVisa()
 /*imaps.connect({
    imap: {
  user: '',
  password: '',
  host: 'imap.yandex.ru',
  port: 993,
  tls: true
}}).then(function (connection) {
    return connection.openBox('INBOX').then(function () {
      var date = new Date();
      date.setDate(date.getDate() - 1);
        const searchCriteria =  [['SINCE', date], ['FROM', 'info.spain@blshelpline.com']];
        const fetchOptions = {
            bodies: ['TEXT'],
            markSeen: false
        };
        return connection.search(searchCriteria, fetchOptions).then(function (messages) {
          const lastMessage = messages.at(-1) 
          const idHeader = "Imap-Id: " + lastMessage.attributes.uid + "\r\n";
          simpleParser(lastMessage.parts[0].body, (err, mail) => {
              console.log(mail)
          });
        });
    });
});*/
