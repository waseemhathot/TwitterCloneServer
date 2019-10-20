import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IVerifyOptions } from 'passport-local';
import config, { KnownConfigKey } from '../utils/config';
import joi from 'joi';
import loginValidationSchema from '../validators/login-validator'

const router = express.Router();
const jwtSecret: string = config.get(KnownConfigKey.JwtSecret);

router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const {error, value: v} = joi.validate(req.body, loginValidationSchema);
    if (error) {
        next(error);
        return;
    };

    passport.authenticate('local', { session: false }, (err: Error, user: any, info: IVerifyOptions) => {
        if (err || !user) {
            return res.status(400).send({
                message: info.message,
                user,
            });
        }

        req.login(user, { session: false }, (error) => {
            if (error) {
                return res.send(error);
            }

            jwt.sign(user, jwtSecret, (jwtError: Error, token: string) => {
                if (jwtError) res.send(error);
                else res.send({ user, token });

            });
        });
    })(req, res);
});

export default router;