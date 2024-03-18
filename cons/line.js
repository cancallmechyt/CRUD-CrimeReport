const { connection } = require("../db");
const LINE_BOT_API = 'https://api.line.me/v2/bot'
const axios = require('axios')

require('dotenv').config()
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`  
}

exports.Sendmessage = async (req, res) => {
    try {
        const { userId } = req.body
        const body = {
            to: userId,
            messages:[{
                type: 'text',
                text: 'สวัสดีครับ RSU POLICE\nยินดีให้บริการครับ  '
            }]
        }

        const response = await axios.post(
            `${LINE_BOT_API}/message/push`,
            body,
            { headers }
        )

        console.log('response', response.data);
        res.json({
            message: 'Send message success',
            responseData: response.data
        })
    } catch (error) {
        console.log('error', error.response);
        res.status(500).json({ message: 'Error sending message' });
    }
};
