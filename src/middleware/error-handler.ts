import { Request, Response, NextFunction } from 'express';

export const validationErrorHandler = () => (err: Error, req: Request, res: Response, next: NextFunction) =>{
    res.sendStatus(400);
    next();
    return;
}