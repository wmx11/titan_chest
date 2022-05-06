import { Router, Request, Response } from 'express';
import { addToken, deleteToken, getAllTokens, getTokenById, updateToken } from '../controllers/token';

const router = Router();

router.get('/get', async (req: Request, res: Response) => {
  try {
    const tokens = await getAllTokens();

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

router.get('/get/:token_id', async (req: Request, res: Response) => {
  try {
    const token = await getTokenById(parseInt(req.params.token_id, 10));

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

router.post('/add', async (req: Request, res: Response) => {
  try {
    const entry = await addToken(req.body);

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

router.patch('/update/:token_id', async (req: Request, res: Response) => {
  try {
    const token = await updateToken(parseInt(req.params.token_id, 10), req.body);

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

router.delete('/delete/:token_id', async (req: Request, res: Response) => {
  try {
    const token = await deleteToken(parseInt(req.params.token_id, 10));

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
