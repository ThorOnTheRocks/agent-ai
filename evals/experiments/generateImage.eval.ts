import { generateImageToolDefinition } from './../../src/tools/generateImage';
import { runLLM } from "../../src/llm";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";
import { createToolCallMessage } from '../evalTools';

runEval('generateImage', {
  task: (input) => runLLM({
    messages: [{role: "user", content: input}],
    tools: [generateImageToolDefinition]
  }),
  data: [
    {input: 'Generate an image of a sunrise', expected: createToolCallMessage(generateImageToolDefinition.name) },
    {input: 'take a photo of the sunrise', expected: createToolCallMessage(generateImageToolDefinition.name) }
  ],
  scorers: [ToolCallMatch]
})