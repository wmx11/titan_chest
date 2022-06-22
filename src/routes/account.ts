import { Router, Request, Response } from 'express';
import { getBalance } from '../controllers/account';
import { AccountRequestQuery } from '../types/Account';

const router = Router();

router.get('/get/balance', async (req: Request, res: Response): Promise<Response<string>> => {
  const query: AccountRequestQuery = req.query;

  try {
    const balance = await getBalance(query?.address as string);
    
    return res.json({
      success: true,
      data: balance,
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
