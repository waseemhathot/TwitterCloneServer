import express from 'express';
import { resolveStore } from '../middleware/store';
import { retrieveAndSendTweets } from './tweets';
import joi from 'joi';
import membersValidationSchema from '../validators/members-validator';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const {error, value: v} = joi.validate(req.params, membersValidationSchema);
    if (error) {
        next(error);
        return;
    };

    const rootStore = resolveStore(res);
    const id = req.params.id;

    try {
        const user = await rootStore.users.findById(id);
        if (user) {
            res.send(user).status(200);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch {
        res.sendStatus(404);
    }
});

router.get('/:id/tweets', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    const {error, value: v} = joi.validate(req.params, membersValidationSchema);
    if (error) {
        next(error);
        return;
    };

    try { 
        const rootStore = resolveStore(res);
        const id = req.params.id;
        const tweets = await rootStore.tweets.findManyByUserId(id);

        retrieveAndSendTweets(req, res, tweets);
    }
    catch { 
        res.sendStatus(404);
    }

});

export default router;