import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    
    
    /*
    if (currentUser.type!=="Admin" ) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    */


    const users = await prismadb.user.findMany({
      include: {
        tickets: {
        },
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: `Something went wrong: ${error}` });
  }
}
