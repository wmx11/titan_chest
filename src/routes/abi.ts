import { ABI } from '@prisma/client';
import { Router, Request, Response } from 'express';
import { addAbi, deleteAbi, getAbiById, getAllAbi, updateAbi } from '../controllers/abi';
import { authToken } from '../middlewares/authThoken';

const router = Router();

router.get('/get', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const abis: ABI[] = await getAllAbi();

    return res.json({
      success: true,
      data: abis,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.get('/get/:abi_id', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const abi: ABI | null = await getAbiById(parseInt(req.params.abi_id, 10));

    return res.json({
      success: true,
      data: abi,
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
    const entry: ABI | null = await addAbi(req.body);

    return res.json({
      success: true,
      data: entry,
      message: {
        value: 'ABI has been added successfully',
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

router.patch('/update/:abi_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const abi: ABI | null = await updateAbi(parseInt(req.params.abi_id, 10), req.body);

    return res.json({
      success: true,
      data: abi,
      message: {
        value: 'ABI has been updated successfully',
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

router.delete('/delete/:abi_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const abi: ABI | null = await deleteAbi(parseInt(req.params.abi_id, 10));

    return res.json({
      success: true,
      data: abi,
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
