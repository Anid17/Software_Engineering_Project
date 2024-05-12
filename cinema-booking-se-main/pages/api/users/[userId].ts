// Import the necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    // Check if the current user is logged in and has the "User" type
    if (!currentUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { userId } = req.query;

    if (typeof userId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!userId) {
      throw new Error('Missing Id');
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: userId
      }
    });

    return res.status(200).json(user); // Return the user as JSON response
  } catch (error) {
    return res.status(500).json({ error: `Something went wrong: ${error.message}` }); // Internal Server Error
  }
}
