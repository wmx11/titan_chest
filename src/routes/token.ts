import { Token } from '@prisma/client';
import { Router, Request, Response } from 'express';
import { addToken, deleteToken, getAllTokens, getTokenById, updateToken } from '../controllers/token';
import { authToken } from '../middlewares/authThoken';

const router = Router();

router.get('/get', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const tokens: Token[] = await getAllTokens();

    return res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.get('/get/:token_id', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const token: Token | null = await getTokenById(parseInt(req.params.token_id, 10));

    return res.json({
      success: true,
      data: token,
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
    const entry: Token | null = await addToken(req.body);

    return res.json({
      success: true,
      data: entry,
      message: {
        value: 'Token has been added successfully',
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

router.patch('/update/:token_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const token: Token | null = await updateToken(parseInt(req.params.token_id, 10), req.body);

    return res.json({
      success: true,
      data: token,
      message: {
        value: 'Token has been updated successfully',
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

router.delete('/delete/:token_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const token: Token | null = await deleteToken(parseInt(req.params.token_id, 10));

    return res.json({
      success: true,
      data: token,
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
