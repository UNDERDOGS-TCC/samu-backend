import {Request, Response} from 'express';
import mongodb from '../config/mongodb';
import {LoginBody} from '../interfaces/loginBody';

export default {
  login: async (req: Request, res: Response) => {
    const {email, password} = req.body as LoginBody;

    if (!email || !password) {
      res
        .status(200)
        .json({message: 'Email ou senha faltando', success: false});
    } else {
      const usersCollection = await mongodb.getCollection('users');
      const user = await usersCollection.findOne({email: email});
      if (!user) {
        res
          .status(200)
          .json({message: 'Email ou senha incorretos', success: false});
      } else {
        if (user.password !== password) {
          res
            .status(200)
            .json({message: 'Email ou senha incorretos', success: false});
        } else {
          res.status(200).json({
            message: 'User validado com sucesso',
            success: true,
            user,
          });
        }
      }
    }
  },
};
