import { dadJokeToolDefinition } from './../../src/tools/dadJoke';
import { runLLM } from "../../src/llm";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";
import { createToolCallMessage } from '../evalTools';

runEval('dadJoke', {
  task: (input) => runLLM({
    messages: [{role: "user", content: input}],
    tools: [dadJokeToolDefinition]
  }),
  data: [
    {input: 'tell me a dad joke', expected: createToolCallMessage(dadJokeToolDefinition.name) }
  ],
  scorers: [ToolCallMatch]
})