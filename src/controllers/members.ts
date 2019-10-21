import express from 'express';
import { resolveStore } from '../middleware/store';
import { retrieveAndSendTweets } from './router-utils';
import membersValidationSchema from '../validators/members-validator';
import { joiValidation } from '../middleware/joiValidation';

const router = express.Router();

router.get('/:id', joiValidation(membersValidationSchema, (req: express.Request) => req.params),
 async (req: express.Request, res: express.Response, next: express.NextFunction) => {

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

router.get('/:id/tweets', joiValidation(membersValidationSchema, (req: express.Request) => req.params),
 async (req: express.Request, res: express.Response, next: express.NextFunction) => {

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