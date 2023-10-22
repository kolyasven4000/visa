import axios from 'axios'

export const sendToBot = (message) => {
  return axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    params: {
      chat_id: process.env.CHAT_ID,
      text: message
    }
  }).then(r => {

  }).catch(err => {
    console.log(err.data)
  })
}