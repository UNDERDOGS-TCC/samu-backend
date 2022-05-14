import {Request, Response} from 'express';
import mongodb from '../config/mongodb';
import {
  signupParamsValidator,
  updateParamsValidator,
} from '../helpers/paramsValidation';
import {LoginBody} from '../interfaces/loginBody';
import {SignupBody} from '../interfaces/signupBody';
import {User} from '../interfaces/user';

export default {
  signup: async (req: Request, res: Response) => {
    const error = await signupParamsValidator(req.body);

    if (error) {
      res.status(200).json({message: error.message, success: false});
    } else {
      const body = req.body as SignupBody;

      delete body.passwordConfirmation;

      if (!body.complement) {
        body.complement = 'N/A';
      }

      const users = await mongodb.getCollection('users');
      const response = await users.insertOne(body);

      res.status(200).json({
        message: 'Usuário criado com sucesso',
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
          delete user.password;

          res.status(200).json({
            message: 'Usuário validado com sucesso',
            success: true,
            user,
          });
        }
      }
    }
  },
  update: async (req: Request, res: Response) => {
    const error = updateParamsValidator(req.body);

    if (error) {
      res.status(200).json({message: error.message, success: false});
    }

    const user = req.body;
    delete user._id;

    const usersCollection = await mongodb.getCollection('users');
    const userFound = await usersCollection.findOne({email: user.email});

    if (!userFound) {
      res.status(200).json({message: 'Usuário não encontrado', success: false});
    } else {
      const response = await usersCollection.updateOne(
        {_id: userFound._id},
        {$set: user},
      );

      if (response.acknowledged) {
        res.status(200).json({
          message: 'Usuário atualizado',
          success: true,
          id: response.upsertedId,
        });
      } else {
        res.status(200).json({
          message:
            'Ocorreu um erro ao atualizar o usuário, tente novamente mais tarde',
          success: false,
        });
      }
    }
  },
  getUserById: async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!id) {
      res.status(200).json({message: 'Id de usuário faltando', success: false});
      return;
    }

    const usersCollection = await mongodb.getCollection('users');
    const user = (await usersCollection.findOne({_id: id})) as unknown as User;

    if (!user) {
      res.status(200).json({message: 'Usuário não encontrado', success: false});
      return;
    }

    delete user.password;

    res
      .status(200)
      .json({message: 'Usuáiro encontrado', success: true, user: user});
    return;
  },
};
