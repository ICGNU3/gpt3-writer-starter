import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Act like an expert on the subject of the following prompt. Create refined a description of the plan and it's goals.

Create a 90 day plan with 77 days of work and 13 days of breaks.

Title: USER_TITLE_GOES_HERE

Plan: OUTPUT_FROM_PROMPT_HERE
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.77,
    max_tokens: 1250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
