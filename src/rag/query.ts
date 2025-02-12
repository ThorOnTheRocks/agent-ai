import { Index as UpstashIndex } from '@upstash/vector'

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

type MovieMetadata = {
  title?: string
  year?: string
  genre?: string
  director?: string
  actors?: string
  rating?: string
  votes?: string
  revenue?: string
  metascore?: string
}

export const queryMovies = async ({query, filters, topK = 10}: {query: string, filters?: Partial<MovieMetadata>, topK?: number}) => {

  return index.query({
    data: query,
    topK,
    includeMetadata: true,
    includeData: true
  })
}