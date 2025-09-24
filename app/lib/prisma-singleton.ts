
import { PrismaClient } from '@prisma/client'

class PrismaSingleton {
  private static instance: PrismaClient | null = null

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      try {
        PrismaSingleton.instance = new PrismaClient({
          log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
          datasources: {
            db: {
              url: process.env.DATABASE_URL,
            },
          },
        })
      } catch (error) {
        console.error('Error creating Prisma client:', error)
        throw error
      }
    }
    return PrismaSingleton.instance
  }

  public static async disconnect(): Promise<void> {
    if (PrismaSingleton.instance) {
      await PrismaSingleton.instance.$disconnect()
      PrismaSingleton.instance = null
    }
  }
}

export const prisma = PrismaSingleton.getInstance()
export default prisma
