import { runLLM } from "../../src/llm";
import { redditToolDefinition } from "../../src/tools/reddit";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";
import { createToolCallMessage } from "../evalTools";

runEval('reddit', {
  task: (input) => runLLM({
    messages: [{role: "user", content: input}],
    tools: [redditToolDefinition]
  }),
  data: [
    {input: 'find me something interesting on reddit', expected: createToolCallMessage(redditToolDefinition.name) }
  ],
	scorers: [ToolCallMatch]
})