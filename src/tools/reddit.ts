import type { ToolFn } from '../../types';
import { z } from 'zod';
import fetch from 'node-fetch';

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({}),
  description:
    'Use this tool to get the latest posts from Reddit. It will return a JSON object with the title, link, subreddit, author, and upvotes of each post.',
};

type Args = z.infer<typeof redditToolDefinition.parameters>;

export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { data } = await fetch(
    'https://www.reddit.com/r/HollywoodHoes/.json'
  ).then((res) => res.json());

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.url,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }));

  return JSON.stringify(relevantInfo, null, 2);
};
