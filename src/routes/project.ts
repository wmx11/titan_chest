import { Project } from '@prisma/client';
import { Router, Request, Response } from 'express';
import { addProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/project';
import { authToken } from '../middlewares/authThoken';
import { Payload } from '../types/Stats';

const router = Router();

router.get('/get', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const projects: Project[] = await getAllProjects();

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

router.get('/get/:project_id', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const projectId = parseInt(req.params.project_id, 10);

    const payload: Payload = {
      type: projectId ? 'project_id' : 'name',
      value: projectId || req.params.project_id,
      ...(req.query as Omit<Payload, 'type' | 'value'>),
    };

    const project: Project | null = await getProjectById(payload);

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

router.post('/add', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const entry: Project | null = await addProject(req.body);

    return res.json({
      success: true,
      data: entry,
      message: {
        value: 'New project has been added successfully',
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

router.patch('/update/:project_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const project: Project | null = await updateProject(parseInt(req.params.project_id, 10), req.body);

    return res.json({
      success: true,
      data: project,
      message: {
        value: 'Project has been updated successfully',
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

router.delete('/delete/:project_id', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const project: Project | null = await deleteProject(parseInt(req.params.project_id, 10));

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
