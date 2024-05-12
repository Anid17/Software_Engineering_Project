import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, User } from '@prisma/client';
import prismadb from '@/lib/prismadb';

interface UserSearchQuery {
  query: string;
}

interface UserSearchStrategy {
  searchUsers(query: string): Promise<User[]>;
}

class FirstNameSearchStrategy implements UserSearchStrategy {
  public async searchUsers(query: string): Promise<User[]> {
    return prismadb.user.findMany({
      where: {
        firstName: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
  }
}

class LastNameSearchStrategy implements UserSearchStrategy {
  public async searchUsers(query: string): Promise<User[]> {
    return prismadb.user.findMany({
      where: {
        lastName: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
  }
}

class EmailSearchStrategy implements UserSearchStrategy {
  public async searchUsers(query: string): Promise<User[]> {
    return prismadb.user.findMany({
      where: {
        email: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
  }
}

class UserSearchFactory {
  public static createSearchStrategy(queryType: string): UserSearchStrategy {
    if (queryType === 'firstName') {
      return new FirstNameSearchStrategy();
    } else if (queryType === 'lastName') {
      return new LastNameSearchStrategy();
    } else if (queryType === 'email') {
      return new EmailSearchStrategy();
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

      const searchStrategy = UserSearchFactory.createSearchStrategy(type);
      const users = await searchStrategy.searchUsers(query);

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).end();
    }
  }
}
