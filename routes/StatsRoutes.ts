import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = (app: Application) => {
  app.get('/', (req, res: Response) => {
    return res.json({
      alive: true
    });
  });

  app.post('/set-stats', async (req: Request, res: Response) => {
    try {
      const entry = await prisma.stats.create({
        data: {...req.body}
      });
  
      return res.json({
        success: true,
        data: entry
      });
  
    } catch (error) {
      console.log(error);
  
      return res.json({
        success: false,
        message: error
      })
    }
  });

  app.get('/get-stats', async (req, res: Response) => {
    try {
      const data = await prisma.stats.findMany({
        take: 1,
        orderBy: [
          { id: 'desc' }
        ]
      });
  
      return res.json({
        success: true,
        data
      })
  
    } catch (error) {
      console.log(error);
  
      return res.json({
        success: false,
        message: error
      })
    }
  });
};