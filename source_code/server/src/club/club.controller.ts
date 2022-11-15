import { Request, Response } from 'express';
import { OK } from 'http-status';

const create = async (req: Request, res: Response) => {
  return res.status(OK).send();
};

export { create };
