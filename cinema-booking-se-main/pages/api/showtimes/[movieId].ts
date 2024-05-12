import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { movieId } = req.query;

        if (typeof movieId !== 'string') {
        throw new Error('Invalid Movie ID');
        }

        if (!movieId) {
        throw new Error('Missing Movie ID');
        }

        const showtimes = await prismadb.movie.findUnique({
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

        return res.status(200).json(showtimes)
  } catch (error) {
    return res.status(500).json({ error: `Something went wrong: ${error}` });
  }
}
