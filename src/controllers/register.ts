import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { saltAndHash } from '../utils/hash';
import { resolveStore } from '../middleware/store';
import uuid from 'uuid';
import { UserToken, UserCredential } from '../models';
import { RootStore } from '../store/root';
import jwt from 'jsonwebtoken';
import config, { KnownConfigKey } from '../utils/config';



const router = express.Router();
const jwtSecret: string = config.get(KnownConfigKey.JwtSecret);

async function addUserCredsToDb(rootStore: RootStore ,userCreds: UserCredential): Promise<void> {
    await rootStore.credentials.addOne(userCreds);
}

async function addUserTokenToDb(rootStore: RootStore, userToken: UserToken): Promise<void> {
    await rootStore.users.addOne(userToken);
}

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const id: string = uuid();
    const rootStore = resolveStore(res);

    const user: UserToken = {
        userHandle: req.body.userHandle,
        avatarUrl: req.body.avatarUrl,
        id: id,
        email: req.body.email,
        registrationDate: Date(),
        lastLoginDate: Date(),
    }
    
    try {
        const hashedPassword: string = await saltAndHash(req.body.password);

        await addUserTokenToDb(rootStore, user);
        
        await addUserCredsToDb(rootStore, {
            id: id, 
            email: req.body.email, 
            password: hashedPassword
        });

        req.login(user, { session: false }, (error) => {
            if (error) {
                return res.send(error);
            }

            jwt.sign(user, jwtSecret, (jwtError: Error, token: string) => {
                if (jwtError) res.send(error);
                else res.status(201).send({ user, token })
            });
        });
    }
    catch(err) {
        res.sendStatus(409);
    }
});

export default router;


