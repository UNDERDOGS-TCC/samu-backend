import {Request, Response} from 'express';
import {signupParamsValidator} from '../helpers/paramsValidation';

export default {
  signup: (req: Request, res: Response) => {
    const error = signupParamsValidator(req.body);

    if (error) {
      res.status(400).json({message: error.message, success: false});
    } else {
      res.status(200).send('signup');
    }
  },
};
