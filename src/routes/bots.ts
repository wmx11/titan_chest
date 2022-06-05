import { Bots } from '@prisma/client';
import { Router, Request, Response } from 'express';
import { addBot, deleteBot, getAllBots, getBotById, updateBot } from '../controllers/bots';
import { authToken } from '../middlewares/authThoken';

const router = Router();

router.get('/get', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const bots: Bots[] = await getAllBots();

    return res.json({
      success: true,
      data: bots,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.get('/get/:bot_id', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const bot: Bots | null = await getBotById(parseInt(req.params.bot_id, 10));

    return res.json({
      success: true,
      data: bot,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.post('/add', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const entry: Bots | null = await addBot(req.body);

    return res.json({
      success: true,
      data: entry,
      message: {
        value: 'Bot has been added successfully',
        type: 'success',
      },
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.patch('/update/:bot_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const bot: Bots | null = await updateBot(parseInt(req.params.bot_id, 10), req.body);

    return res.json({
      success: true,
      data: bot,
      message: {
        value: 'Bot has been updated successfully',
        type: 'success',
      },
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.delete('/delete/:bot_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const bot: Bots | null = await deleteBot(parseInt(req.params.bot_id, 10));

    return res.json({
      success: true,
      data: bot,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

export default router;
