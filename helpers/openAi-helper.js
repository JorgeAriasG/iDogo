const { openApi } = require('../config.json');
const axios = require('axios');

module.exports = {

        postInput: async function(input) {
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
        },

        postInputImg: async function(input) {
            let res;
            const API_URL = 'https://api.openai.com/v1/images/generations';
            await axios.post(API_URL, {
                'prompt': input,
                'n': 1,
                'size': '1024x1024',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openApi.apiKey}`,
                },
            }).then((response) => {
                res = response.data.data[0].url;
            }).catch((error) => {
                console.log({ error });
            });
            return res;
        },
};
