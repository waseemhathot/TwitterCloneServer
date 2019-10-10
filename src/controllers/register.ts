import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { saltAndHash } from '../utils/hash';
import { resolveStore } from '../middleware/store';
import uuid from 'uuid';

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const userHandle: string = req.body.userHandle;
    const avatarUrl: string = req.body.avatarUrl;
    const password: string = req.body.password;
    const id: string = uuid();
    const rootStore = resolveStore(res);

    saltAndHash(password, (err: Error, hash: string) => {
        rootStore.credentials.addOne({
            password: hash,
            email: email,
            id: id,
        })
        .then(data => {
            rootStore.users.addOne({
                userHandle: userHandle,
                avatarUrl: avatarUrl,
                id: id,
            }).then(data => {
                res.status(201).send({
                    id: id,
                    email: email,
                    userHandle: userHandle,
                    avatarUrl: avatarUrl,
                });
                next();
            })
            .catch(err => {
                res.sendStatus(err);
                next();
            })
        })
        .catch(err => {
            res.sendStatus(err);
            next();
        });
    });

 });

 export default router;