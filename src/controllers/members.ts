import express from 'express';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/:id', (req, res) => {

    // const user = store.users.find(o => o.id === req.params.id)
    // if(user){
    //     res.send(user);
    // }
    // else{ 
    //     res.send(404);
    // }
});

export default router;