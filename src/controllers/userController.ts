import {Request, Response} from 'express';
import mongodb from '../config/mongodb';
import {signupParamsValidator} from '../helpers/paramsValidation';
import {LoginBody} from '../interfaces/loginBody';
import {SignupBody} from '../interfaces/SignupBody';

export default {
  signup: async (req: Request, res: Response) => {
    const error = await signupParamsValidator(req.body);

    if (error) {
      res.status(400).json({message: error.message, success: false});
    } else {
      const body = req.body as SignupBody;

      delete body.passwordConfirmation;

      if (!body.complement) {
        body.complement = 'N/A';
      }

      const users = await mongodb.getCollection('users');
      const response = await users.insertOne(body);

      res.status(200).json({
        message: 'User created',
        success: true,
        id: response.insertedId,
      });
    }
  },
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
