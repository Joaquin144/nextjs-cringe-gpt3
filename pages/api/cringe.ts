// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompyt is missing" });
  }

  if (prompt.length > 100) {
    return res.status(400).json({ error: "Prompyt length exceeds 100" });
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Create a cringy motivational quote on the following topic.\n
    Topic: ${prompt}\n
    Cringy motivational quote:`,
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0
  })

  const quote = completion.data.choices[0].text;
  return res.status(200).json({ quote });

}
