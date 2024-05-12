// Import the necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieId) {
      throw new Error('Missing Id');
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId
      },
      include: {
        showtimes: {
          select: {
            id: true,
            dateTime: true,
            type: true
          },
          orderBy: {
            dateTime: 'asc'
          }
        }
        
      }
    });

    return res.status(200).json(movies); // Return the movie as JSON response

  } catch (error) {
    console.log({ error });
    return res.status(500).end(); // Internal Server Error
  }
}
