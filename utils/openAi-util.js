const { openApi } = require('../config.json');
const axios = require('axios');

async function postInput(input) {
    let res;
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    await axios.post(API_URL, {
        model: 'gpt-3.5-turbo',
        messages: [{
            'role': 'user',
            'content': input,
        }],
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openApi.apiKey}`,
        },
    }).then((response) => {
        res = response.data.choices[0].message.content;
    }).catch((error) => {
        console.log({ error });
    });
    return res;
}

module.exports = postInput;