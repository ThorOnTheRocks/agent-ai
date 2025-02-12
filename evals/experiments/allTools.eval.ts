import { dadJokeToolDefinition } from './../../src/tools/dadJoke';
import { redditToolDefinition } from '../../src/tools/reddit';
import { generateImageToolDefinition } from '../../src/tools/generateImage';
import { runLLM } from "../../src/llm";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";
import { createToolCallMessage } from '../evalTools';

const allTools = [
  dadJokeToolDefinition,
  generateImageToolDefinition,
  redditToolDefinition
]

runEval('allTools', {
  task: (input) => runLLM({
    messages: [{role: "user", content: input}],
    tools: allTools
  }),
  data: [
    {input: 'tell me a dad joke', expected: createToolCallMessage(dadJokeToolDefinition.name) },
    {input: 'generate an image of a frozen lake', expected: createToolCallMessage(generateImageToolDefinition.name) },
    {input: 'tell me something spicy from reddit', expected: createToolCallMessage(redditToolDefinition.name) }
  ],
  scorers: [ToolCallMatch]
})