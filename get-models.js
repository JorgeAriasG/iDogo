const { Configuration, OpenAIApi } = require('openai');
const { openApi } = require('./config.json');

const configuration = new Configuration({
    apiKey: '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',
  });

const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});
