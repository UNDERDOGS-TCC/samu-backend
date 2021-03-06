import {Request, Response} from 'express';
import mongodb from '../config/mongodb';
import crypto from 'crypto';
import {ObjectId} from 'mongodb';
import {
  signupParamsValidator,
  updateParamsValidator,
} from '../helpers/paramsValidation';
import {LoginBody} from '../interfaces/loginBody';
import {SignupBody} from '../interfaces/signupBody';
import {User} from '../interfaces/user';
import sendEmail from '../config/send-email';
import {SendEmailParams} from '../interfaces/sendEmailParams';

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
    const user = (await usersCollection.findOne({
      _id: new ObjectId(id),
    })) as unknown as User;

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
  resetPassword: async (req: Request, res: Response) => {
    const {cpf, email, birthday} = req.body as {
      cpf: string;
      email: string;
      birthday: string;
    };

    if (!cpf || !email || !birthday) {
      res.status(200).json({message: 'Dados faltando', success: false});
      return;
    }

    const usersCollection = await mongodb.getCollection('users');
    const user = (await usersCollection.findOne({
      cpf: cpf,
      email: email,
      birthday: birthday,
    })) as unknown as User;

    if (!user) {
      res.status(200).json({message: 'Usuário não encontrado', success: false});
      return;
    }

    const newPassword = crypto.randomUUID();
    user.password = newPassword;
    const response = await usersCollection.updateOne(
      {_id: new ObjectId(user._id)},
      {$set: user},
    );

    if (!response.acknowledged) {
      res
        .status(200)
        .json({message: 'Não foi possível redefinir a senha', success: false});
      return;
    }

    const mailBody: string = `
      <p>Olá, <strong>${user.name.split(' ')[0]}</strong>.</p>
      <p>Sua nova senha é <strong>${newPassword}</strong>.</p>
      <p>Você deve alterar para uma nova senha dentro do aplicativo.</p>
    `;

    const mailObject: SendEmailParams = {
      to: user.email,
      message: mailBody,
      subject: 'Sua senha foi redefinida',
    };

    await sendEmail(mailObject);

    res.status(200).json({
      message: 'Sua nova senha foi enviada para o seu email',
      success: true,
    });
  },
  redefinePassword: async (req: Request, res: Response) => {
    const {id, oldPassword, newPassword} = req.body as {
      id: string;
      oldPassword: string;
      newPassword: string;
    };

    if (!id || !oldPassword || !newPassword) {
      res.status(200).json({message: 'Dados faltando', success: false});
      return;
    }

    const usersCollection = await mongodb.getCollection('users');
    const user = await usersCollection.findOne({_id: new ObjectId(id)});

    if (!user) {
      res.status(200).json({message: 'Usuário não encontrado', success: false});
      return;
    }

    if (user.password !== oldPassword) {
      res.status(200).json({message: 'Senha atual incorreta', success: false});
      return;
    }

    user.password = newPassword;
    const response = await usersCollection.updateOne(
      {_id: new ObjectId(user._id)},
      {$set: user},
    );

    if (!response.acknowledged) {
      res
        .status(200)
        .json({message: 'Não foi possível redefinir a senha', success: false});
      return;
    }

    res.status(200).json({
      message: 'Sua senha foi redefinida com sucesso',
      success: true,
    });
  },
};
