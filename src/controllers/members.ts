import express from 'express';
import { resolveStore } from '../middleware/store';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {

    const rootStore = resolveStore(res);
    const id = req.params.id;

    try {
        const user = await rootStore.users.findById(id);
        if (user) {
            res.send(user).status(200);
        }
        res.sendStatus(404);

    }
    catch {
        res.sendStatus(404);
    }
});

router.get('/:id/tweets', async (req: express.Request, res: express.Response) => {
    const rootStore = resolveStore(res);
    const id = req.params.id;

    try { 
        const tweets = await rootStore.tweets.findManyByUserId(id);
        if(tweets) {
            res.status(200).send(tweets);
        }
        res.sendStatus(404);
    }
    catch { 
        res.sendStatus(404);
    }

});

export default router;