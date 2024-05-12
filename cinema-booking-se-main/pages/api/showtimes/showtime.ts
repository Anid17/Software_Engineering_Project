import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { showtimeId } = req.query;

        if (typeof showtimeId !== 'string') {
        throw new Error('Invalid Showtime ID');
        }

        if (!showtimeId) {
        throw new Error('Missing Showtime ID');
        }

        const showtimes = await prismadb.showtime.findUnique({
          where: {
            id: showtimeId
          },
          include: {
            seatStatus: {
              select: {
                id: true,
                seatRow: true,
                seatNumber: true
              }
            }
            
          }
        });

        return res.status(200).json(showtimes)
  } catch (error) {
    return res.status(500).json({ error: `Something went wrong: ${error}` });
  }
}
