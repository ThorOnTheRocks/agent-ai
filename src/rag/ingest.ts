import 'dotenv/config';
import {Index as UpstashIndex} from '@upstash/vector';
import { parse } from 'csv-parse/sync';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string
})

export const indexMovieData = async () => {
  const spinner = ora('Reading movie data...').start();
  const moviesPath = path.join(process.cwd(), 'src/rag/imdb_movies_dataset.csv');
  const csvData = fs.readFileSync(moviesPath, 'utf-8');
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true
  })

  spinner.text = 'Starting movie indexing...'

  for(const movie of records) {
    spinner.text = `Indexing movie: ${movie.Title}`
    const text = `${movie.Title}, ${movie.Genre}. ${movie.Description}`
    
    try {
      await index.upsert({
        id: movie.Series_Title,
        data: text,
        metadata: {
          title: movie.Series_Title,
          year: movie.Released_Year,
          genre: movie.Genre,
          director: movie.Director,
          actors: [movie.Star1, movie.Star2, movie.Star3, movie.Star4],
          rating: movie.IMDB_Rating,
          votes: movie.No_of_Votes,
          revenue: movie.Gross,
          metascore: movie.Meta_score,
        },
      })
    } catch (error) {
      spinner.fail(`Error indexing movie ${movie.Title}`)
      console.error(error)
    }
    spinner.succeed('Finished indexing movie data')
  }
}

indexMovieData();