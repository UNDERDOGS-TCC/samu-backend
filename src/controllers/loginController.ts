import {Request, Response} from 'express';
import mongodb from '../config/mongodb';
import {LoginBody} from '../interfaces/loginBody';

export default {
  login: async (req: Request, res: Response) => {
    const {email, password} = req.body as LoginBody;

    if (!email || !password) {
      res
        .status(400)
        .json({message: 'Email or password missing!', success: false});
    } else {
      const usersCollection = await mongodb.getCollection('users');
      const user = await usersCollection.findOne({email: email});
      if (!user) {
        res
          .status(400)
          .json({message: 'Email or password incorrect!', success: false});
      } else {
        if (user.password !== password) {
          res
            .status(400)
            .json({message: 'Email or password incorrect!', success: false});
        } else {
          res.status(200).json({
            message: 'User validated!',
            success: true,
            user,
          });
        }
      }
    }
  },
};
