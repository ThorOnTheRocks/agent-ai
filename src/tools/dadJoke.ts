import { z } from 'zod';
import type { ToolFn } from '../../types';
import fetch from 'node-fetch';

export const dadJokeToolDefinition = {
  name: 'dad_joke',
  parameters: z.object({}),
  description: 'get a funny dad joke',
};

type Args = z.infer<typeof dadJokeToolDefinition.parameters>;

export const dadJoke: ToolFn<Args, string> = async ({ toolArgs }) => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  });

  return (await response.json()).joke;
};
