import { Network } from '@prisma/client';
import { Router, Request, Response } from 'express';
import { addNetwork, deleteNetwork, getAllNetworks, getNetworkById, updateNetwork } from '../controllers/network';
import { authToken } from '../middlewares/authThoken';

const router = Router();

router.get('/get', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const networks: Network[] = await getAllNetworks();

    return res.json({
      success: true,
      data: networks,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.get('/get/:network_id', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const network: Network | null = await getNetworkById(parseInt(req.params.network_id, 10));

    return res.json({
      success: true,
      data: network,
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
    const entry: Network | null = await addNetwork(req.body);

    return res.json({
      success: true,
      data: entry,
      message: {
        value: 'Network address has been added successfully',
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

router.patch('/update/:network_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const network: Network | null = await updateNetwork(parseInt(req.params.network_id, 10), req.body);

    return res.json({
      success: true,
      data: network,
      message: {
        value: 'Network address has been updated successfully',
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

router.delete('/delete/:network_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const network: Network | null = await deleteNetwork(parseInt(req.params.network_id, 10));

    return res.json({
      success: true,
      data: network,
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
