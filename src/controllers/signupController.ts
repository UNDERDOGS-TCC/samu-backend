import {Request, Response} from 'express';
import {signupParamsValidator} from '../helpers/paramsValidation';
import mongodb from '../config/mongodb';
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
};
