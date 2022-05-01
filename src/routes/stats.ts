import { Router, Request, Response } from 'express';
import { addProjectStats, getProjectStatsById } from '../controllers/stats';

const router = Router();

/**
 * @desc - Check if the service is alive
 */
router.get('/check', (req: Request, res: Response) =>
  res.json({
    alive: true,
  }),
);

/**
 * @desc - Get the latest project stats
 */
router.get('/get/:project_id', async (req: Request, res: Response) => {
  try {
    const stats = await getProjectStatsById(parseInt(req.params.project_id, 10));

    return res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

/**
 * @desc - Save project stats to the database
 */
router.post('/add', async (req: Request, res: Response) => {
  try {
    const entry = await addProjectStats(req.body);

    return res.json({
      success: true,
      data: entry,
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
