import { Router, Request, Response } from 'express';
import {
  addLiquidityPool,
  deleteLiquidityPool,
  getAllLiquidityPools,
  getLiquidityPoolById,
  updateLiquidityPool,
} from '../controllers/liquidity';

const router = Router();

router.get('/get', async (req: Request, res: Response) => {
  try {
    const liquidityPools = await getAllLiquidityPools();

    return res.json({
      success: true,
      data: liquidityPools,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.get('/get/:liquidity_id', async (req: Request, res: Response) => {
  try {
    const liquidityPool = await getLiquidityPoolById(parseInt(req.params.liquidity_id, 10));

    return res.json({
      success: true,
      data: liquidityPool,
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
    const entry = await addLiquidityPool(req.body);

    return res.json({
      success: true,
      data: entry,
      message: {
        value: 'LP address has been added successfully',
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

router.patch('/update/:liquidity_id', async (req: Request, res: Response) => {
  try {
    const liquidityPool = await updateLiquidityPool(parseInt(req.params.liquidity_id, 10), req.body);

    return res.json({
      success: true,
      data: liquidityPool,
      message: {
        value: 'LP address has been updated successfully',
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

router.delete('/delete/:liquidity_id', async (req: Request, res: Response) => {
  try {
    const liquidityPool = await deleteLiquidityPool(parseInt(req.params.liquidity_id, 10));

    return res.json({
      success: true,
      data: liquidityPool,
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
