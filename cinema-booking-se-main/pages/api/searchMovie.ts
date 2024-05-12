import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, Movie } from '@prisma/client';
import prismadb from '@/lib/prismadb';

interface MovieSearchQuery {
  query: string;
}

interface MovieSearchStrategy {
  searchMovies(query: string): Promise<Movie[]>;
}

class TitleSearchStrategy implements MovieSearchStrategy {
  public async searchMovies(query: string): Promise<Movie[]> {
    return prismadb.movie.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
  }
}

class DescriptionSearchStrategy implements MovieSearchStrategy {
  public async searchMovies(query: string): Promise<Movie[]> {
    return prismadb.movie.findMany({
      where: {
        description: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
  }
}

class MovieSearchFactory {
  public static createSearchStrategy(queryType: string): MovieSearchStrategy {
    if (queryType === 'title') {
      return new TitleSearchStrategy();
    } else if (queryType === 'description') {
      return new DescriptionSearchStrategy();
    } else {
      throw new Error('Invalid query type');
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { q: query, type } = req.query;

      if (typeof query !== 'string' || typeof type !== 'string') {
        throw new Error('Invalid request');
      }

      const searchStrategy = MovieSearchFactory.createSearchStrategy(type);
      const movies = await searchStrategy.searchMovies(query);

      res.status(200).json({ movies });
    } catch (error) {
      res.status(500).end();
    }
  }
}
