import { Router, Request, Response } from 'express';
import { addUser, deleteUser, getAllUsers, getUserById, login, register, updateUser } from '../controllers/user';
import { authToken } from '../middlewares/authThoken';
import { UserNamePassword, UserLoginState } from '../types/User';
import { Response as ResponseType } from '../types/Response';

const router = Router();

router.get('/get', authToken, async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const users: object = await getAllUsers();

    return res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const { name, password }: UserNamePassword = req.body;

    const user: UserLoginState | ResponseType = await login({ name, password });

    return res.status(user.status).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.post('/register', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const { name, password }: UserNamePassword = req.body;

    const user: ResponseType = await register({ name, password });

    return res.status(user.status).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.get('/get/:user_id', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const user = await getUserById();

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.post('/add', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const user = await addUser();

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.patch('/update/:user_id', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const user = await updateUser();

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error,
    });
  }
});

router.delete('/delete/:user_id', async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const user = await deleteUser();

    return res.json({
      success: true,
      data: user,
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
