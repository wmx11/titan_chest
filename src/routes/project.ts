import { Router, Request, Response } from 'express';
import { addProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/project';

const router = Router();

router.get('/get', async (req: Request, res: Response) => {
  try {
    const projects = await getAllProjects();

    return res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.get('/get/:project_id', async (req: Request, res: Response) => {
  try {
    const project = await getProjectById(parseInt(req.params.project_id, 10));

    return res.json({
      success: true,
      data: project,
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
    const entry = await addProject(req.body);

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

router.patch('/update/:project_id', async (req: Request, res: Response) => {
  try {
    const project = await updateProject(parseInt(req.params.project_id, 10), req.body);

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.delete('/delete/:project_id', async (req: Request, res: Response) => {
  try {
    const project = await deleteProject(parseInt(req.params.project_id, 10));

    return res.json({
      success: true,
      data: project,
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
