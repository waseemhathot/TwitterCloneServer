import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { saltAndHash } from '../utils/hash';
import store from '../store/index';
import { resolveStore } from '../middleware/store';
import { UserRole } from '../models/credentials';
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
        store.credentials.push({
            password: password,
            email: email,
            userHandle: userHandle,
            roles: [UserRole.User],
            avatarUrl: '',
            id: id,
        });

        store.users.push({
            name: userHandle,
            avatarUrl: avatarUrl,
            id: id
        });

        rootStore.credentials.addOne({
            password: hash,
            email: email,
            userHandle: userHandle,
            roles: [UserRole.User],
            avatarUrl: '',
            id: id,
        })
        .then(data => {
            res.sendStatus(200);
            next();
        })
        .catch(err => {
            res.sendStatus(err);
            next();
        });
    });

 });

 export default router;