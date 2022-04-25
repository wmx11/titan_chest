import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @desc - Check if the service is alive
 */
router.get('/check', (req: Request, res: Response) => res.json({
  alive: true,
}));

/**
 * @desc - Get the latest project stats
 */
router.get('/:project_id', (req: Request, res: Response) => {

});

/**
 * @desc - Save project stats to the database
 */
router.post('/save:project_id', (req: Request, res: Response) => {

});

export default router;
