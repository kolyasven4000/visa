import { sleep } from './utils.js'
const fetchVisa = async () => {
  let setCookie = process.env.COOKIE_VALUE
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
      console.log(setCookie)
      return r.text()
    }).then(async r => {
      console.log(r.length)
      const [, availableDates] = r.match(/var available_dates.+\[(.+?)\]/i) || []
      console.log(availableDates)
      if (availableDates) {
        sendToBot(availableDates)
      } else {
        console.log(new Date().toLocaleTimeString())
        await sleep(100000)
        getData()
      }
    })
  }
  getData()
}
fetchVisa()