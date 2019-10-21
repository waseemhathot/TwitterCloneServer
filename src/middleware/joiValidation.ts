
import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export const joiValidation = (validator:joi.ObjectSchema, callback: (req: Request) => any) => (req: Request, res: Response, next: NextFunction) =>{

    const value = callback(req);
    
    const {error, value: v} = joi.validate(value, validator);
    if (error) {
        next(error);
        return;
    };

    next();
    return;
}