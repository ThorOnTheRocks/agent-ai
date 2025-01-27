import 'dotenv/config';
import { runLLM } from './src/llm';
import { addMessages, getMessages } from './src/memory';

const userMessage = process.argv[2];

if (!userMessage) {
  console.log('Please provide a message');
  process.exit(1);
}
await addMessages([{ role: 'user', content: userMessage }]);
const messages = await getMessages();

const response = await runLLM({
  messages: [...messages, { role: 'user', content: userMessage }],
});

await addMessages([{ role: 'assistant', content: response }]);

console.log(response);
