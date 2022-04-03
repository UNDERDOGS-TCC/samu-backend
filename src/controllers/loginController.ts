import {Request, Response} from 'express';

export default {
  login: (req: Request, res: Response) => {
    res.send('hello world');
  },
};
