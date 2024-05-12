// Import the necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { userId } = req.body;

    if (typeof userId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!userId) {
      throw new Error('Missing Id');
    }

    const tickets = await prismadb.ticket.findMany({
      where: {
        userId: userId
      },
      include: {
        movie: {
          select: {
            title: true,
            bannerUrl: true,
          },
        },
      }
    });

    return res.status(200).json(tickets); // Return the movie as JSON response

  } catch (error) {
    console.log({ error });
    return res.status(500).end(); // Internal Server Error
  }
}
