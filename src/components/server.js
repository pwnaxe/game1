const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(cors());
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.post('/generate-response', async (req, res) => {
  const { environment, interaction, context } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    prompt: `${environment}\n${interaction}\n${context}`,
    max_tokens: 100
  });
  console.log(completion.data.choices[0].message);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}.`);
});

app.use(morgan('dev'));